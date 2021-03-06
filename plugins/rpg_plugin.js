const fs = require('fs');
const fsPromise = require('fs/promises');
var ui = JSON.parse(fs.readFileSync('./env.json', 'utf-8'));
const repair = require("./repair");

module.exports = {

    async initial(userId){ //reset
        if(userId.length!=18&&userId.length!=19||typeof(parseInt(userId))==NaN){
            return new Promise((res,rej)=>{
                rej(`Error: user id isn't a snowflake`);
            })
        }
        if(ui[userId]===undefined){
            ui[userId] = {'lv':0,'exp':0,'totalExp':0,'lastMsg':[2022,6,2,12,12,12],'tasks':[{'type':undefined,'finish':false},{'type':undefined,'finish':false},{'type':undefined,'finish':false}],'lastTask':undefined,'wallet':0,'bank':0,'login':[2022,6,2],'work':[2022,6,2,10]}
            await module.exports.write(ui)
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

    async actions(userId,type,init){
        await module.exports.initial(userId);
        var temp_ui = JSON.parse(fs.readFileSync('./env.json', 'utf-8'))[userId];
        for(const i of type){   //i = {'k':key,'v':value,'act':'+'}
            if(!temp_ui[i['k']]){
                if(i['act'] != undefined) temp_ui[i['k']] = 0;
                else temp_ui[i['k']] = i['v'];
            }
            if(init){
                ui[userId] = temp_ui;
            }else{
                switch(i['act']){
                    case '+':
                        temp_ui[i['k']] += i['v'];
                        break;
                    case '-':
                        if(temp_ui[i['k']]<i['v']) return new Promise((res,rej)=>rej('No enough stuff'))
                        temp_ui[i['k']] -= i['v'];
                        break;
                    default:
                        temp_ui[i['k']] = i['v'];
                        break;
                }
                ui[userId] = temp_ui;
            }
        }
        await module.exports.write(ui);
        return new Promise(res=>res());
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
            res({'before':before,'after':after['rank']});
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
            if(ctn.indexOf(':',ctn.indexOf(':'))-ctn.indexOf('>')===18||ctn.indexOf(':',ctn.indexOf(':'))-ctn.indexOf('>')===19){
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
        await module.exports.write(ui);
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
                    rej(`??????????????????`);
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

    async roleUpdate(userId){
        var rank = ui[userId];
        var ret_level = new Map();
        [2,5,8,11,15,18,20,23,27,30,35,40].forEach(v=>{
            if(rank['lv']>=v){
                ret_level.set(v,true);
            }else{
                ret_level.set(v,false);
            }
        });
        var ret_rank = new Map();
        var tp = await module.exports.tops(null,userId);
        [10,5,3,1].forEach(v=>{
            if(tp<=v){
                ret_rank.set(v,true);
            }else{
                ret_rank.set(v,false);
            }
        });

        return new Promise((res)=>{
            res({'lv':ret_level,'rank':ret_rank})
        });
    },

    async write(w,w2=null){
        if(!!w){
            await repair();
            var str = JSON.stringify(w)
            await fsPromise.writeFile('./env.json',str)
                .catch(err=>{
                    return new Promise((res,rej)=>{
                        rej(err);
                    })
                })
            return new Promise(res=>res());
        }else{
            // w=null
            if(!w2){
                return new Promise((res,rej)=>{
                    rej(`Please pass in parameter`)
                })
            }
            if(!w2['user']&&!w2['ugs']){
                return new Promise((res,rej)=>{
                    rej(`Please pass in correct parameter\n{'user':userID,'ugs':T||F}`)
                })
            }
            await repair();
            ui[w2['user']]['ugs'] = w2['ugs']
            var str = JSON.stringify(ui)
            await fsPromise.writeFile('./env.json',str)
                .catch(err=>{
                    return new Promise((res,rej)=>{
                        rej(err);
                    })
                })
            return new Promise(res=>res());
        }
    },

    async login(userId){
        await module.exports.actions(userId,[{'k':'wallet','v':200,'act':'+'},{'k':'login','v':[2022,6,6]}],true);
        var time = new Date(ui[userId]['login'][0],ui[userId]['login'][1],ui[userId]['login'][2]+1)
        if(Date.now()>=time){
            let da = new Date();
            //success
            await module.exports.actions(userId,[{'k':'wallet','v':200,'act':'+'},{'k':'login','v':[da.getFullYear(),da.getMonth(),da.getDate(),da.getHours()]}]);
            await module.exports.write(ui);
            return new Promise((res,rej)=>{
                res(ui[userId]);
            })
        }else return new Promise((res,rej)=>{
            rej('??????????????????');
        })
    },

    async setMoney(userId,amount,act=undefined){
        await module.exports.actions(userId,[{'k':'wallet','v':amount,'act':act}]);
        return new Promise(res=>res(ui[userId]));
    },

    async deposit(userId,amount){
        await module.exports.actions(userId,[{'k':'wallet','v':amount,'act':'-'},{'k':'bank','v':amount,'act':'+'}])
            .catch(err=>{
                return new Promise((res,rej)=>rej('??????????????????'));
            })
        return new Promise(res=>res(ui[userId]));
    },

    async withdraw(userId,amount){
        await module.exports.actions(userId,[{'k':'wallet','v':amount,'act':'+'},{'k':'bank','v':amount,'act':'-'}])
        .catch(err=>{
            return new Promise((res,rej)=>rej('??????????????????'));
        })
        return new Promise(res=>res(ui[userId]));
    },

    async rob(userId){

    },

    async work(userId){
        await module.exports.actions(userId,[{'k':'work','v':[2022,6,6,2]}],true)
        let da = new Date();
        var time = new Date(ui[userId]['work'][0],ui[userId]['work'][1],ui[userId]['work'][2],ui[userId]['work'][3])
        if(Date.now()-time>=3*60*60*1000){
            let mon = 100 + Math.floor(Math.random()*199)+1
            await module.exports.actions(userId,[{'k':'wallet','v':mon,'act':'+'},{'k':'work','v':[da.getFullYear(),da.getMonth(),da.getDate(),da.getHours()]}])
            return new Promise(res=>res(mon));
        }else{
            return new Promise((res,rej)=>rej());
        }
        
    },

    async checkMoney(userId){
        await module.exports.actions(userId,[{'k':'wallet','v':0},{'k':'bank','v':0}],true);
        return new Promise(res=>{
            res(ui[userId])
        })
    },

    tasksLists:[]

}

