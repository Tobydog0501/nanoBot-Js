const { checkMoney } = require('../plugins/rpg_plugin');
const plu = require('../plugins/rpg_plugin');

module.exports = {
    name:"userinfo",
    category:"test",
    description:"取得使用者資訊",
    aliases:['ui','user'],
    async execute(bot,msg,args,Discord){
      if(!args[0]){
        //author ui
        var member = msg.member;
      }else if(args[0].replace('<@','').replace('>','').length==18){
        try{
          var member = await msg.guild.members.fetch(args[0].replace('<@','').replace('>',''))
        }catch{
          await msg.reply(`User not found`)
          return;
        }
        //searching
      }else{
        //not snowflake
        await msg.reply(`User type not a snowflake`)
        return;
      }
      const rank = await plu.rank(member.id);
      var date = member.joinedAt;
      var a = await checkMoney(member.id);
      let ebd = new Discord.MessageEmbed()
        .setTitle(`使用者資訊`)
        .setDescription(`關於${member}`)
        .setFields([
          {name:`使用者名稱`,value:`${member}`,inline:true},
          {name:`使用者ID`,value:`${member.id}`,inline:true},
          {name:`加入伺服器時間`,value:`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,inline:false},
          {name:`等級`,value:`當前等級：${rank['rank']['lv']}\n總經驗值：${rank['rank']['totalExp']}\n等級進度：||${rank['per']} (${rank['req']})||`,inline:true},
          {name:`伺服器排名`,value:`${await plu.tops(null,member.id)}`,inline:true},
          {name:`帳戶金錢`,value:`錢包：${a['wallet']}\n銀行：${a['bank']}`,inline:false}
        ])
        .setThumbnail(member.user.avatarURL())
        .setFooter({text:`Request by ${msg.author.tag}`,iconURL:msg.author.avatarURL()})
        .setColor('RANDOM')
      await msg.reply({embeds:[ebd]})
    }
  }