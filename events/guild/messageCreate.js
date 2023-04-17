const { exp } = require("../../plugins/rpg_plugin");
const fs = require('fs')
const path = "./token.json"
const prefix = fs.existsSync(path)?"m/":"n/"
const role_update_action = require('../pluginForEvents/roleUpdate')

module.exports = async (Discord,bot,msg)=>{
  if(msg.author.bot){
    return;
  }
  if(msg.content.startsWith(prefix)){ //execute commands
    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase(); //改為小寫
    
    const command = bot.commands.get(cmd);
    if(command) {

      if(msg.member.id=="606668363531288577")
        await command.execute(bot,msg,args,Discord);
      else
        await msg.reply(`目前已將指令移置斜槓指令區了，如果沒有看到你要的指令，八成是有人偷懶`);
      await msg.delete();
    }else{
      await msg.reply(`我好像沒有這個指令欸...`);

    }
    return;
  }
  if(msg.content.startsWith("$")){
    // Other bots' Commands
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
