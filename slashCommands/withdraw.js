const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { withdraw } = require("../plugins/rpg_plugin")

module.exports = {
  data:new SlashCommandBuilder()
	      .setName('withdraw')
	      .setDescription('存錢'),

  async execute(inter,Discord){
    if(typeof parseInt(args[0]) == NaN||args[0]==undefined){
        await inter.reply('請輸入要領多少錢');
        return;
    }
    await withdraw(inter.user.id,parseInt(args[0]))
        .then(async a=>{
            let ebd = new EmbedBuilder()
                .setTitle('取款成功')
                .setDescription(`帳戶錢包：${a['wallet']}\n帳戶銀行：${a['bank']}`)
                .setThumbnail(inter.user.avatarURL()) //被搜尋者頭像
                .setTimestamp()
                .setColor('RANDOM')
                .setFooter({text:`Requested by ${inter.user.tag}`,iconURL:inter.user.avatarURL()});
            await inter.reply({embeds:[ebd]});
        })
        .catch(async (err)=>{
            await inter.reply(err);
        })
    
  }
}