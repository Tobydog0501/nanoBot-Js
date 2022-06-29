var ui = require('./env.json');
const d = new Date()
module.exports = {

    inital(userId){ //reset
        if(!ui[userId]){
            ui[userId] = {'lv':0,'exp':0,'lastMsg':undefined,'tasks':[{'type':undefined,'finish':false},{'type':undefined,'finish':false},{'type':undefined,'finish':false}],'lastTask':undefined}
        }
        write(ui);
    },

    rank(userId){  //read
        this.inital(userId);
        return ui[userId];
    },

    exp(msg,Discord){   //earn exp
        var totalExp = 0;
        this.inital(userId);
        msg.attachments.forEach((v,k)=>{
            if(v!==undefined){
                switch(v.contentType.split('/')[0]){
                    case 'image':
                        totalExp += 10;
                        break;
                    case 'video':
                        totalExp += 35;
                        break;
                }
            }
        })
        if(d.getMilliseconds()-lastMsg>=10*1000){   //msg exp (1:1)
            if(msg.content.includes('http')){   //url
                totalExp += 10;
            }else{  //only msg
                //check emoji
                var ctn = msg.cleanContent
                while(ctn.includes('<:')){    //len = 18
                    if(ctn.indexOf(':',ctn.indexOf(':'))-ctn.indexOf('>')===18){
                        
                    }
                }
            }
        }
        return;
    },

    adminExpSet(bot,userId,msg,Discord){    //give exp
        
        return;
    },

    getTask(bot,msg,Discord){  //random task
        return;
    },

    checkTask(userId){
        return;
    },

    checkAttachments(msg){
        return;
    },

    tasksLists:[]

}

function write(w){
    var str = JSON.stringify(w)
    fs.writeFile('./env.json',str,err=>{
      if(err){
        console.error(err);
      }
      
    })
}