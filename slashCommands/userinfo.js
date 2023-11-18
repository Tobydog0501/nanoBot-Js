const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const plu = require('../plugins/rpg_plugin');
const { checkMoney } = require('../plugins/rpg_plugin');
const snowflake = new RegExp(/<@\d>/)

module.exports = {
  data:new SlashCommandBuilder()
	      .setName('user_info')
	      .setDescription('取得使用者資訊'),

  async execute(inter,Discord){
    await inter.deferReply();
    var member = inter.member
    // if(!args[0]){
    //     //user ui
    //     var member = inter.member;
    //   }else if(snowflake.test(args[0])){  //regExp
    //     try{
    //       var member = await inter.guild.members.fetch(args[0].replace('<@','').replace('>',''))
    //     }catch{
    //       await inter.reply(`User not found`)
    //       return;
    //     }
    //     //searching
    //   }else{
    //     //not snowflake
    //     await inter.reply(`User type not a snowflake`)
    //     return;
    //   }
      const rank = await plu.rank(member.id);
      var date = member.joinedAt;
      var a = await checkMoney(member.id);
      let ebd = new EmbedBuilder()
        .setTitle(`使用者資訊`)
        .setDescription(`關於${member}`)
        .setFields([
          {name:`使用者名稱`,value:`${member}`,inline:true},
          {name:`使用者ID`,value:`${member.id}`,inline:true},
          {name:`加入伺服器時間`,value:`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`,inline:false},
          {name:`等級`,value:`當前等級：${rank['rank']['lv']}\n總經驗值：${rank['rank']['totalExp']}\n等級進度：||${rank['per']} (${rank['req']})||`,inline:true},
          {name:`伺服器排名`,value:`${await plu.tops(null,member.id)}`,inline:true},
          {name:`帳戶金錢`,value:`錢包：${a['wallet']}\n銀行：${a['bank']}`,inline:false}
        ])
        .setThumbnail(member.user.avatarURL())
        .setFooter({text:`Requested by ${inter.user.tag}`,iconURL:inter.user.avatarURL()})
        .setColor('Random')
      await inter.editReply({embeds:[ebd]})
  }
}