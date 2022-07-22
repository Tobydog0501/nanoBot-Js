const fs = require('fs');
const fsPromise = require('fs/promises');
var ui = JSON.parse(fs.readFileSync('./env.json', 'utf-8'));
const repair = require("./repair");

module.exports = {

    async initial(userId){ //reset
        if(userId.length!=18||typeof(parseInt(userId))==NaN){
            return new Promise((res,rej)=>{
                rej(`Error: user id isn't a snowflake`);
            })
        }
        if(ui[userId]===undefined){
            ui[userId] = {'lv':0,'exp':0,'totalExp':0,'lastMsg':[2022,6,2,12,12,12],'tasks':[{'type':undefined,'finish':false},{'type':undefined,'finish':false},{'type':undefined,'finish':false}],'lastTask':undefined}
            await write(ui)
                .catch(err=>{
                    console.error(err);
                })
                .then(()=>{
                    return new Promise(res=>{
                        res('success')
                    });
                });
        }
        
    },

    async rank(userId){  //read
        await module.exports.initial(userId)
            .catch(rej=>{
                return new Promise((res,reject)=>{
                    reject(rej);
                })
            });
        var next = await module.exports.nextLv(userId)

        return new Promise((res,reject)=>{
                    res({'rank':ui[userId],'req':next['req'],'per':next['per']});
                })
    },

    async exp(msg,userId){   //earn exp    //return Promise
        var totalExp = 0;
        await module.exports.initial(userId);
        await module.exports.checkAttachments(msg)
            .then(att=>{
                att.forEach((v,k)=>{
                if(v!==undefined){
                    switch(v){
                        case 'image':
                            totalExp += 10;
                            break;
                        case 'video':
                            totalExp += 35;
                            break;
                    }
                }
            })});
        var time = new Date(ui[userId]['lastMsg'][0],ui[userId]['lastMsg'][1],ui[userId]['lastMsg'][2],ui[userId]['lastMsg'][3],ui[userId]['lastMsg'][4],ui[userId]['lastMsg'][5])
        if(Date.now()-time>=10*1000){   //msg exp (1:1)
            await module.exports.checkURL(msg)
                .then(async url=>{
                    if(url){
                        totalExp += 10;
                    }else{  //only msg
                        //clean emoji
                        var ctn = msg.cleanContent;
                        await module.exports.checkEmoji(ctn)
                            .then(nCtn=>{
                                totalExp += nCtn['content'].length>20?20:nCtn['content'].length;
                        });   
                    }
                })

            const d = new Date();
            ui[msg.author.id]['lastMsg'] = [d.getFullYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds()];
        }
        ui[msg.author.id]['exp'] += totalExp;
        ui[userId]['totalExp'] += totalExp;
        return new Promise(async res=>{
            await module.exports.checkLevelUp(msg.author.id)
                .then(val=>{
                    res(val);  //should return value if level up
                });
        });
    },

    async adminExpSet(userId,exp){    //give exp
        var set = false;
        await module.exports.initial(userId)
        var before = {'lv': ui[userId]['lv'],'exp':ui[userId]['exp'],'totalExp':ui[userId]['totalExp']};
        if(exp.includes('+')){
            ui[userId]['exp'] += parseInt(exp.replace('+',''));
            ui[userId]['totalExp'] += parseInt(exp);
        }else if(exp.includes('-')){
            ui[userId]['exp'] -= parseInt(exp.replace('-',''));
            ui[userId]['totalExp'] -= parseInt(exp.replace('-',''));
        }else {
            ui[userId]['totalExp'] = parseInt(exp);
            set = true;
        }
        await module.exports.checkLevelUp(userId,set)
        var after = await module.exports.rank(userId);
        return new Promise(async res=>{
            res({'before':before,'after':after});
        })
    },

    async getTask(bot,msg,Discord){  //random task
        return;
    },

    async checkTask(userId){
        return;
    },

    async checkAttachments(msg){    //return Promise
        return new Promise((res,rej)=>{
            res(msg.attachments.map((v,k)=>{
                if(v!==undefined){
                    switch(v.contentType.split('/')[0]){
                        case 'image':
                            return 'image';
                        case 'video':
                            return 'video';
                    }
                }
            }))
        })
    },

    async checkURL(msg){
        return new Promise(res=>{
            if(msg.content.includes('http')) res(true);
            else res(false);
        })
        
    },

    async checkEmoji(ctn){  //return Promise
        var emojis = 0;
        while(ctn.includes('<:')){    //len = 18
            if(ctn.indexOf(':',ctn.indexOf(':'))-ctn.indexOf('>')===18){
                ctn.replace(ctn.slice(ctn.indexOf('<:'),ctn.indexOf(':')+19),'x');  //19 might be wrong
                emojis += 1;
            }
        }
        return new Promise(res=>{
            res({'content':ctn,'emojis':emojis});
        })

    },

    async checkLevelUp(userId,set){ //return Promise
        var levelExpRequire = [80,150,250];
        var check = false,check2 = false;
        if(set){    //if mode is set, not plus or minus
            ui[userId]['lv'] = 0;
            ui[userId]['exp'] = ui[userId]['totalExp'];
        }
        if(levelExpRequire[ui[userId]['lv']]===undefined){
            //upper than level 2
            var need = (ui[userId]['lv']+1)*100;
        }else var need = levelExpRequire[ui[userId]['lv']];
        //plus
        while(ui[userId]['exp'] >= need){   //looping until match
            check = true;
            ui[userId]['exp'] -= need;
            ui[userId]['lv'] += 1;
            if(levelExpRequire[ui[userId]['lv']]===undefined){
                //upper than level 2
                need = (ui[userId]['lv']+1)*100;
            }else need = levelExpRequire[ui[userId]['lv']];
        }
        //minus
        if(levelExpRequire[ui[userId]['lv']-1]===undefined){
            //upper than level 3
            var lower = (ui[userId]['lv'])*100;
        }else var lower = levelExpRequire[ui[userId]['lv']-1];

        while(ui[userId]['exp']<0){
            check2 =true;
            ui[userId]['exp'] += lower;
            ui[userId]['lv'] -= 1;
            if(levelExpRequire[ui[userId]['lv']-1]===undefined){
                //upper than level 3
                lower = (ui[userId]['lv'])*100;
            }else lower = levelExpRequire[ui[userId]['lv']-1];
        }
        if(check2){
            ui[userId]['totalExp'] = await module.exports.expAmount(userId);
        }
        await write(ui);
        return new Promise(res=>{
            if(check) res({'lv':ui[userId]['lv'],'exp':ui[userId]['exp']});
            else res(undefined);
        });
    },

    async expAmount(userId){
        var levelExpRequire = [80,150,250];
        var amount = 0;
        await module.exports.initial(userId);
        for(var lv=ui[userId]['lv'];lv>0;lv--){
            if(lv>3){
                amount += lv*100;
            }else{
                amount += levelExpRequire[lv-1];
            }
        }
        amount += ui[userId]['exp'];
        ui[userId]['totalExp'] = amount;
        return new Promise(res=>{
            res(amount);
        });

    },

    async tops(page,user){
        var list = []
        for(var i in ui){
            list.push({'userId':i,'rank':ui[i]});
        }
        list.sort((a,b)=>{
            return b['rank']['totalExp']-a['rank']['totalExp'];
        })
        var list2 = []
        for(var i of list){
            list2.push(i['userId'])
        }
        var returnList = []
        return new Promise((res,rej)=>{
            if(page!=null){
                list.forEach((v,i)=>{
                    if((i+1) <= page*10){
                        returnList.push(v)
                    }
                })
                res(returnList);
            }else{
                var rank = list2.indexOf(user)+1;
                if(rank==-1){
                    rej(`未查到此玩家`);
                }else{
                    res(rank);
                }
            }
        })
    },

    async nextLv(userId){
        var levelExpRequire = [80,150,250];
        var currentExp = ui[userId]['exp'];
        var currentLv = ui[userId]['lv'];
        if(currentLv>2){
            var requireExp = 100*(currentLv+1);
        }else{
            var requireExp = levelExpRequire[currentLv]
        }
        const ret = {'req':`${currentExp}/${requireExp}`,'per':`${Math.round(currentExp/requireExp*100)}%`}
        return new Promise(res=>{
            res(ret)
        })
    },

    tasksLists:[]

}

async function write(w){
    await repair();
    var str = JSON.stringify(w)
    await fsPromise.writeFile('./env.json',str)
        .catch(err=>{
            return new Promise((res,rej)=>{
                rej(err);
            })
        })
    return new Promise(res=>res());
    
}