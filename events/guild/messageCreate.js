const { exp } = require("../../plugins/rpg_plugin");
const fs = require('fs')
const path = "./token.json"
const prefix = fs.existsSync(path)?"m/":"n/"
const role_update_action = require('../pluginForEvents/roleUpdate')

module.exports = async (Discord,bot,msg)=>{
  if(msg.author.bot){
    return
  }
  if(msg.content.startsWith(prefix)){ //execute commands
    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase(); //改為小寫
    
    const command = bot.commands.get(cmd);
    if(command) {
      await command.execute(bot,msg,args,Discord);
      await msg.delete();
    }else{
      await msg.reply(`我好像沒有這個指令欸...`)
    }
    return;
  }else if(/(?=^[^http])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\b[^\.]*\.[^\.]*\.[^\.]*[\n|\b]/gm.test(msg.content)){
    //Discord bot TOKEN
    let chn = await msg.guild.channels.fetch('1020521950449246268');
    msg.member.timeout(1000*60*60*24,'傳送TOKEN');
    let ebd = new Discord.MessageEmbed()
      .setTitle('警告紀錄')
      .setDescription(`已在<#${msg.channel.id}>封鎖一則訊息，傳送者<@${msg.author.id}>\n違規內容：傳送疑似Token訊息`)
      .setColor([255,0,0])
    chn.send({content:`<@${msg.author.id}>，Discord之規定不允許傳送Token，如有任何問題請詢問管理員`,embeds:[ebd]});
    msg.delete();
    return;
  }else if(/https:\/\/discord.gg\/.*/gm.test(msg.content)){
    let chn = await msg.guild.channels.fetch('1020521950449246268');
    msg.member.timeout(1000*60,'傳送連結');
    let ebd = new Discord.MessageEmbed()
      .setTitle('警告紀錄')
      .setDescription(`已在<#${msg.channel.id}>封鎖一則訊息，傳送者<@${msg.author.id}>\n違規內容：傳送DC群組邀請連結`)
      .setColor([255,0,0])
   chn.send({content:`<@${msg.author.id}>，本群之規定不允許傳送DC邀請連結，如有任何問題請詢問管理員`,embeds:[ebd]});
    msg.delete();
    return;
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
