const { exp , roleUpdate } = require("../../plugins/rpg_plugin");
const fs = require('fs')
const path = "./token.json"
const prefix = fs.existsSync(path)?"m/":"n/"
const action = require('../pluginForEvents/action');
const role_update_action = require('../pluginForEvents/roleUpdate')

module.exports = async (Discord,bot,msg)=>{
  if(msg.author.bot){
    return
  }
  if(msg.content.startsWith(prefix)){
    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    
    const command = bot.commands.get(cmd);
    if(command) {
      command.execute(bot,msg,args,Discord);
      await msg.delete();
    }
    return;
  }
  var msgCtn = msg.content.replace(" ","");
  if(msgCtn.replace("cl","d").includes('discord')&&msgCtn.includes('http')&&msgCtn.includes('discord.gg')&&!msg.member.permissions.has('MANAGE_ROLES')){
    if(bot.warns.some(times=>times)){
      bot.warns.set(msg.author.id,{'reason':'刷頻連結','times':bot.warns.get(msg.author.id).times+1})
    }else{
      bot.warns.set(msg.author.id,{'reason':'刷頻連結','times':1})
    }
    await action(Discord,bot,msg)
    return
  }else if(msgCtn.includes('.')){
    //token
    if(msgCtn.indexOf('.',msgCtn.indexOf('.')+1)-msgCtn.indexOf('.')===6){
      if(!msgCtn.includes('http')&&msgCtn.length>=59){
        if(bot.warns.some(times=>times)){
          bot.warns.set(msg.author.id,{'reason':'傳送疑似token','times':bot.warns.get(msg.author.id).times+5})
        }else{
          bot.warns.set(msg.author.id,{'reason':'傳送疑似token','times':5})
        }
        await action(Discord,bot,msg)
      }
      return
    }
  }
    await exp(msg,msg.author.id)
        .then(async a=>{
          if(a!==undefined){
            await msg.guild.channels.fetch('926251048266530816')
              .then(async chn=>{
                await chn.send(`<@${msg.author.id}>，恭喜~你的彈藥量增加到了**${a['lv']}公升**\n多多訓練吧~\n放心，距離||~~流出來啦!!!~~||還遠得呢~💓`)
              })
          await role_update_action(msg);
          }
        }); //upgrade mention
  
}
