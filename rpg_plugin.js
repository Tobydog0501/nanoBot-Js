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

    async exp(msg,Discord){   //earn exp
        var totalExp = 0;
        await this.inital(userId);
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
        return new Promise(res=>{
            res();  //should return value if level up
        });
    },

    async adminExpSet(bot,userId,msg,Discord){    //give exp
        
        return;
    },

    async getTask(bot,msg,Discord){  //random task
        return;
    },

    async checkTask(userId){
        return;
    },

    async checkAttachments(msg){
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

    async checkEmoji(ctn){
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

    async checkLevelUp(userId){
        return;
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