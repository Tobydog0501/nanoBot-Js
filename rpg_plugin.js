var ui = require('./env.json');
const d = new Date();

module.exports = {

    async inital(userId){ //reset
        if(!ui[userId]){
            ui[userId] = {'lv':0,'exp':0,'lastMsg':undefined,'tasks':[{'type':undefined,'finish':false},{'type':undefined,'finish':false},{'type':undefined,'finish':false}],'lastTask':undefined}
        }
        await write(ui)
            .catch(err=>{
                console.error(err);
            });
        return;
    },

    async rank(userId){  //read
        await this.inital(userId);
        return ui[userId];
    },

    async exp(msg,userId,Discord){   //earn exp    //return Promise
        var totalExp = 0;
        this.inital(userId);
        await this.checkAttachments(msg)
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
        if(d.getMilliseconds()-lastMsg>=10*1000){   //msg exp (1:1)
            if(this.checkURL(msg)){   //url
                totalExp += 10;
            }else{  //only msg
                //clean emoji
                var ctn = msg.cleanContent;
                await this.checkEmoji(ctn)
                    .then(nCtn=>{
                        totalExp += nCtn['content'].length;
                    });
                
            }
            ui[msg.author.id][lastMsg] = d.getMilliseconds();
        }
        ui[msg.author.id][exp] += totalExp;
        return new Promise(async res=>{
            await this.checkLevelUp(msg.author.id)
                .then(val=>{
                    res(val);  //should return value if level up
                });
        });
    },

    async adminExpSet(bot,userId,exp,Discord){    //give exp
        await this.inital(userId);
        if(exp.includes('+')){
            ui[userId]['exp'] += parseInt(exp.replace('+',''));
        }else if(exp.includes('-')){
            ui[userId]['exp'] -= parseInt(exp.replace('-',''));
        }else {
            ui[userId]['exp'] = parseInt(exp);
        }
        await this.checkLevelUp(userId)
            .then(fin=>{
                return new Promise(res=>{
                    res(`已修改完成`)
                })
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
        if(msg.content.includes('http')) return true;
        else return false;
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

    async checkLevelUp(userId){ //return Promise
        var levelExpRequire = [80,150,250];
        var check = false;
        if(!levelExpRequire[ui[userId]['lv']]){
            //upper than level 3
            var need = (ui[userId]['lv']+1)*100;
        }else var need = levelExpRequire[ui[userId]['lv']];
        while(ui[userId]['exp'] >= need){
            check = true;
            ui[userId]['exp'] -= need;
            ui[userId]['lv'] += 1;
            if(!levelExpRequire[ui[userId]['lv']]){
                //upper than level 3
                need = (ui[userId]['lv']+1)*100;
            }else need = levelExpRequire[ui[userId]['lv']];
        }
        await write(ui);
        return new Promise(res=>{
            if(check) res({'lv':ui[userId]['lv'],'exp':ui[userId]['exp']});
            else res(undefined);
        });
    },

    tasksLists:[]

}

async function write(w){
    var str = JSON.stringify(w)
    fs.writeFile('./env.json',str,err=>{
        return new Promise((resolve,reject)=>{
            if(err){
                reject(`Error: ${err}`)
              }else{
                resolve('finished')
            } 
            
        })
       
    })
}