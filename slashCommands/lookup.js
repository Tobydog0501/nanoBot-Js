const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { checkMoney } = require("../plugins/rpg_plugin")

module.exports = {
  data:new SlashCommandBuilder()
	      .setName('lookup')
	      .setDescription('查詢餘額'),

  async execute(inter,Discord){
    await inter.deferReply();
    await checkMoney(inter.user.id)
            .then(async a=>{
                let ebd = new EmbedBuilder()
                    .setTitle('帳戶金錢')
                    .setDescription(`使用者${inter.member}帳戶資訊\n帳戶錢包：${a['wallet']}元\n帳戶銀行：${a['bank']}元`)
                    .setThumbnail(inter.user.avatarURL()) //被搜尋者頭像
                    .setTimestamp()
                    .setColor('Random')
                    .setFooter({text:`Requested by ${inter.user.tag}`,iconURL:inter.user.avatarURL()})
                await inter.editReply({embeds:[ebd]});
            })
  }
}