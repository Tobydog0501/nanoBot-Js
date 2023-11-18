const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { login } = require("../plugins/rpg_plugin")

module.exports = {
  data:new SlashCommandBuilder()
	      .setName('login')
	      .setDescription('每日登入'),

  async execute(inter,Discord){
    await inter.deferReply();
    await login(inter.user.id)
            .then(async a=>{
                let ebd = new EmbedBuilder()
                    .setTitle('每日簽到')
                    .setDescription(`登入成功！明天也請記得來簽到喔\n帳戶錢包：${a['wallet']}\n帳戶銀行：${a['bank']?a['bank']:0}`)
                    .setThumbnail(inter.user.avatarURL()) //被搜尋者頭像
                    .setTimestamp()
                    .setColor('Random')
                    .setFooter({text:`Requested by ${inter.user.tag}`,iconURL:inter.user.avatarURL()})
                await inter.editReply({embeds:[ebd]});
            })
            .catch(async (err)=>{
                await inter.editReply({content:err});
            })
  }
}