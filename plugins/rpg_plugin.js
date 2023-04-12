const fs = require('fs');
const fsPromise = require('fs/promises');
const dungeons = require('./rpgs/dungeons');
var ui = JSON.parse(fs.readFileSync('./env.json', 'utf-8'));
const repair = require("./repair");
const adventures = require('./rpgs/adventure');
const IDTYPE = new RegExp(/\d{17,}/)
const file_edit = require("./file_edit");
const file = new file_edit();

module.exports = {

    /**
     * Initial user's data.
     * @param {string} userId The user to inital.
     * @returns {Promise<String>} return "success" if successful.
     * @example
     * await initial(userId);
     */
    async initial(userId){ //reset
        if(!IDTYPE.test(userId)){   //Check if userId is legal
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

    /**
     * Created for economy system, it can initial, add, minus, or set.
     * 
     * Keys should follow the env.json, and "act" should be undefined if you want to "set" the value.
     * @param {String} userId The user to be taken actions.
     * @param {[object]} type A list of objects, format:[{'k':key,'v':value,'act':'+'}]
     * @param {boolean} [init] Whether to init or not.
     * @returns {Promise<void>}
     * @example
     * Initial: await actions(userid,[{'k':key,'v':value,'act':'+'}],true);
     * Not initial: await actions(userid,[{'k':key,'v':value,'act':'+'}]);
     */
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

    /**
     * Reading user's rank.
     * @param {String} userId The target user.
     * @returns {Promise<object>} {rank(including lv and exp),exp reqired for next lv,current percentage}
     * @example
     * await rank(userId);
     */
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

    /**
     * Counting and adding exp to user.
     * @param {import("discord.js").Message} msg The msg object.
     * @param {String} userId Target user.
     * @returns {Promise<object>|undefined} Lv and exp if upgraded.
     * @example
     * await exp(msg,userId);
     */
    async exp(msg,userId){   //earn exp    //return Promise
        var totalExp = 0;
        await module.exports.initial(userId);
        msg.attachments.forEach(v=>{
            if(v!==undefined){
                let a = v.contentType.split('/')[0]
                if(a=="image"){
                    totalExp += 10;
                }else{
                    totalExp += 35;
                }
            }
        })
        var time = new Date(ui[userId]['lastMsg'][0],ui[userId]['lastMsg'][1],ui[userId]['lastMsg'][2],ui[userId]['lastMsg'][3],ui[userId]['lastMsg'][4],ui[userId]['lastMsg'][5])
        if(Date.now()-time>=10*1000){   //msg exp (1:1)
            if(/https?:\/\/.+/gm.test(msg.content)){  //check url
                msg = msg.content.replace(/https?:\/\/.+/,"");
                totalExp += 10;
            }else{  //only msg
                //check emoji
                await module.exports.checkEmoji(msg.content)
                    .then(nCtn=>{
                        totalExp += nCtn['content'].length>20?20:nCtn['content'].length;
                });   
            }
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

    /**
     * A command for admin to set people's exp.
     * @param {String} userId Target user.
     * @param {String} exp execution and amount.
     * @returns {Promise<object>} Before and after.
     * @example
     * Add: await adminExpSet(userId,"+100");
     * Minus: await adminExpSet(userId,"-100");
     * Set: await adminExpSet(userId,"100");
     */
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

    /**
     * 
     * @param {*} bot 
     * @param {*} msg 
     * @param {*} Discord 
     * @returns 
     */
    async getTask(bot,msg,Discord){  //random task
        return;
    },

    /**
     * 
     * @param {*} userId 
     * @returns 
     */
    async checkTask(userId){
        return;
    },

    /**
     * Check if attachments exist
     * @param {import("discord.js").Message} msg The msg object.
     * @returns {Promise<Array>} List with "image" or "video".
     * @example
     * await checkAttachments(msg);
     */
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

    /**
     * A functions to check urls
     * @param {import("discord.js").Message} msg The msg object.
     * @returns {Promise<boolean>} Whether url exists.
     * @example
     * await checkURL(msg);
     */
    async checkURL(msg){
        return new Promise(res=>{
            if(msg.content.includes('http')) res(true);
            else res(false);
        })
        
    },

    /**
     * A functions to check emojis
     * @param {String} ctn Message content.
     * @returns {Promise<Object>} New message, key:"content".
     * @example
     * await checkEmoji(ctn);
     */
    async checkEmoji(ctn){  //return Promise
        while(ctn.match(/<:[0-z]+:[0-9]+>/g)){    //len = 18
            ctn = ctn.replace(/<:[0-z]+:[0-9]+>/g,"x");
        }
        while(ctn.match(/<:[0-z]+:>/g)){    //len = 18
            ctn = ctn.replace(/<:[0-z]+:>/g,"");
        }
        return new Promise(res=>{
            res({'content':ctn});
        })

    },

    /**
     * Check if an user upgraded.
     * @param {String} userId Target user.
     * @param {boolean|undefined} [set] If the action is "set".
     * @returns {Promise<object>|Promise<undefined>} Lv and exp.
     * @example
     * Normal: await checkLevelUp(userId);
     * Set: await checkLevelUp(userId,true);
     */
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

    /**
     * Total exp.
     * @param {String} userId Target user.
     * @returns {Promise<number>} Amount exp.
     * @example
     * await expAmount(userId);
     */
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

    /**
     * Check top ranked users.
     * @param {number|null} page  the page you want to check.
     * @param {String|undefined} [user] Target user.
     * @returns {Promise<Array<object>>|Promise<String>} Return array if search with page, and return string if search with user
     * @example
     * Page: await tops(1);
     * User: await tops(null,userId);
     */
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

    /**
     * Caculate exp required for next lv.
     * @param {String} userId Target user.
     * @returns {Promise<object>} required exp and current percentage.
     * @example
     * await nexLv(userId);
     */
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

    /**
     * Check for ranked roles.
     * @param {String} userId Target user.
     * @returns {Promise<object>} lv and rank
     * @example
     * await roleUpdate(userId);
     */
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

    /**
     * Special function for writing JSON.
     * @param {object|null} w json data.
     * @param {object|undefined} [w2] For under ground storage.
     * @returns {Promise<void>}
     * @example
     * Normal: await write(ui);
     * Ugs: await write(null,{'user':userID,'ugs':true|false});
     */
    async write(w,w2){
        if(!!w){
            await file.write(w);
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
            ui[w2['user']]['ugs'] = w2['ugs']
            await file.write(ui);
           
            return new Promise(res=>res());
        }
    },

    /**
     * Daily login command.
     * @param {String} userId Target user.
     * @returns {Promise<object>|Promise<String>} res(object) | rej(String)
     * @example
     * await login(userId);
     */
    async login(userId){
        await module.exports.actions(userId,[{'k':'wallet','v':200,'act':'+'},{'k':'login','v':[2022,6,6]}],true);
        var time = new Date(ui[userId]['login'][0],ui[userId]['login'][1],ui[userId]['login'][2]+1)
        if(Date.now()>=time){
            let da = new Date();
            //success
            await module.exports.actions(userId,[{'k':'wallet','v':100,'act':'+'},{'k':'login','v':[da.getFullYear(),da.getMonth(),da.getDate(),da.getHours()]}]);
            await module.exports.write(ui);
            return new Promise((res,rej)=>{
                res(ui[userId]);
            })
        }else return new Promise((res,rej)=>{
            rej('尚未達到一天');
        })
    },

    /**
     * Set user's money
     * @param {String} userId Target user.
     * @param {number} amount The amount of money.
     * @param {"+"|"-"|undefined} act Action to be taken.
     * @returns {Promise<object>} userinfo
     * @example
     * Add: await setMoney(userId,100,"+");
     * Minus: await setMoney(userId,100,"-");
     * Set: await setMoney(userId,100);
     */
    async setMoney(userId,amount,act=undefined){
        await module.exports.actions(userId,[{'k':'wallet','v':amount,'act':act}]);
        return new Promise(res=>res(ui[userId]));
    },

    /**
     * Deposit money.
     * @param {String} userId Target user.
     * @param {number} amount Amount money.
     * @returns {Promise<object>|Promise<String>} return String if user has no enough money.
     * @example
     * await deposit(userId,100);
     */
    async deposit(userId,amount){
        await module.exports.actions(userId,[{'k':'wallet','v':amount,'act':'-'},{'k':'bank','v':amount,'act':'+'}])
            .catch(err=>{
                return new Promise((res,rej)=>rej('沒有足夠金錢'));
            })
        return new Promise(res=>res(ui[userId]));
    },

    /**
     * Withdraw money.
     * @param {String} userId Target user.
     * @param {number} amount Amount money.
     * @returns {Promise<object>|Promise<String>} return String if user has no enough money.
     * @example
     * await withdraw(userId,100);
     */
    async withdraw(userId,amount){
        await module.exports.actions(userId,[{'k':'wallet','v':amount,'act':'+'},{'k':'bank','v':amount,'act':'-'}])
        .catch(err=>{
            return new Promise((res,rej)=>rej('沒有足夠金錢'));
        })
        return new Promise(res=>res(ui[userId]));
    },

    /**
     * Rob a person.
     * @param {String} robber Robber's id.
     * @param {String} userId Victim's id.
     * @returns {Promise<Array<boolean,object|undefined>>} Return true and wallet if success, else return false.
     * 
     * Might return error if they dont meet the criteria.
     * @example
     * await rob(robberId,victimId);
     */
    async rob(robber,userId){
        let money = await module.exports.checkMoney(userId);
        let money2 = await module.exports.checkMoney(robber);
        if(money['wallet']<=1000||money2['wallet']>1000){
            return new Promise((res,rej)=>{
                rej(money['wallet']<=1000?"對方沒辦法被搶":"你沒有搶錢的資格");
            })
        }else{
            let success = Math.random()*3<=1?true:false;
            if(success){
                await module.exports.setMoney(robber,money['wallet']-1000,'+');
                await module.exports.setMoney(userId,1000);
                return new Promise((res)=>{
                    res([true,money["wallet"]]);
                })
            }else{
                await module.exports.setMoney(robber,0);
                return new Promise((res)=>{
                    res([false]);
                })
            }
        }
    },

    /**
     * Try to work every 3 hours.
     * @param {string} userId Target user.
     * @returns {Promise<number>|Promise<rejection>} Reject if cooldown isnt over.
     * @example
     * await work(userId);
     */
    async work(userId){
        await module.exports.actions(userId,[{'k':'work','v':[2022,6,6,2]}],true);
        let da = new Date();
        var time = new Date(ui[userId]['work'][0],ui[userId]['work'][1],ui[userId]['work'][2],ui[userId]['work'][3]);
        if(Date.now()-time>=3*60*60*1000){
            let mon = 20 + Math.floor(Math.random()*29)+1;
            await module.exports.actions(userId,[{'k':'wallet','v':mon,'act':'+'},{'k':'work','v':[da.getFullYear(),da.getMonth(),da.getDate(),da.getHours()]}])
            return new Promise(res=>res(mon));
        }else{
            return new Promise((res,rej)=>rej());
        }
        
    },

    /**
     * Check user's money.
     * @param {string} userId Target user.
     * @returns {Promise<object>}
     * @example
     * await checkMoney(userId);
     */
    async checkMoney(userId){
        await module.exports.actions(userId,[{'k':'wallet','v':0},{'k':'bank','v':0}],true);
        return new Promise(res=>{
            res(ui[userId])
        })
    },

    async dungeon(userId,channelId,args){
        const dun = new dungeons(channelId);
        switch(args){
            case 'start':
                dun.start();
                break;
            case 'end':
                dun.end();
                break;
        }
        return new Promise(res=>res());
    },

    async adventure(userId,channelId,args){
        const adv = new adventures(channelId);
        switch(args){
            case 'start':
                adv.start();
                break;
            case 'end':
                adv.end();
                break;
        }
        return new Promise(res=>res());
    },

}

