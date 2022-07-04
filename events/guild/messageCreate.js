const { exp } = require("../../rpg_plugin");
const fs = require('fs')
const path = "./token.json"
const prefix = fs.existsSync(path)?"m/":"n/"


module.exports = async (Discord,bot,msg)=>{
  if(msg.author.bot){
    return
  }
  if(msg.content.startsWith(prefix)){
    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    
    const command = bot.commands.get(cmd);
    if(command) command.execute(bot,msg,args,Discord);
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
    }else{
      await exp(msg,msg.author.id,Discord)
        .then(async a=>{
          if(a!==undefined){
            await msg.guild.channels.fetch('926251048266530816')
              .then(async chn=>{
                await chn.send(`<@${msg.author.id}>，恭喜~你的彈藥量增加到了**${a['lv']}公升**\n多多訓練吧~\n放心，距離||~~流出來啦!!!~~||還遠得呢~💓`)
              })
          }
        }); //upgrade mention
    }
  }else{
    await exp(msg,msg.author.id,Discord)
        .then(async a=>{
          if(a!==undefined){
            await msg.guild.channels.fetch('926251048266530816')
              .then(async chn=>{
                await chn.send(`<@${msg.author.id}>，恭喜~你的彈藥量增加到了**${a['lv']}公升**\n多多訓練吧~\n放心，距離||~~流出來啦!!!~~||還遠得呢~💓`)
              })
          }
        }); //upgrade mention
  }
}


async function action(Discord,bot,msg){
  var coll = bot.warns.filter(times=>times.times>=5)
    coll.forEach(async (v,k)=>{
      await msg.guild.members.fetch(k)
        .then(async mem=>{
        await mem.timeout((v.reason=='刷頻連結'?30:60)*60*1000,v.reason)
          .catch(console.error)
        await mem.createDM()
          .then(async chn=>{
            await chn.send(`您因為${v.reason}而被禁言${v.reason=='刷頻連結'?'30':'60'}分鐘`);
        })
        bot.warns.set(msg.author.id,0)
        await msg.guild.channels.fetch('972464113290711050')
          .then(async channel=>{
            await channel.send({content:'<@989184598632181801>',embeds:[new Discord.MessageEmbed().setTitle('懲處').setDescription(v.reason=='刷頻連結'?`<@${k}>因傳送${v.times}次可疑連結而被禁言30分鐘`:`<@${k}>因傳送${v.times}次疑似token之訊息而被禁言60分鐘`)],
                               components:[new Discord.MessageActionRow().setComponents([
                                 new Discord.MessageButton()
                                   .setCustomId(`dtt-${k}`)
                                   .setLabel('解除禁言')
                                   .setStyle("SUCCESS"),
                                 new Discord.MessageButton()
                                   .setCustomId(`ban-${k}`)
                                   .setLabel('停權使用者')
                                   .setStyle("DANGER")
                               ])]})
                               .then(msg=>msg.edit({embeds:[new Discord.MessageEmbed().setTitle('懲處').setDescription(v.reason=='刷頻連結'?`<@${k}>因傳送${v.times}次可疑連結而被禁言30分鐘`:`<@${k}>因傳送${v.times}次疑似token之訊息而被禁言60分鐘`)],
                               components:[new Discord.MessageActionRow().setComponents([
                                 new Discord.MessageButton()
                                   .setCustomId(`dtt-${k}`)
                                   .setLabel('解除禁言')
                                   .setStyle("SUCCESS"),
                                 new Discord.MessageButton()
                                   .setCustomId(`ban-${k}`)
                                   .setLabel('停權使用者')
                                   .setStyle("DANGER")
                               ])]}))
        })
      })
    })
    await msg.delete();  //偵測可疑連結刪除
}