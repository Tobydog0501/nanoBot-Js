const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { work } = require("../plugins/rpg_plugin")

module.exports = {
  data:new SlashCommandBuilder()
	      .setName('work')
	      .setDescription('嘗試工作'),

  async execute(inter,Discord){
    await inter.deferReply();
    await work(inter.user.id)
            .then(async a=>{
                let ebd = new EmbedBuilder()
                    .setTitle('工作結果')
                    .setDescription(`恭喜你藉由工作獲得了${a}元`)
                    .setThumbnail(inter.user.avatarURL()) //被搜尋者頭像
                    .setColor('Random')
                    .setTimestamp()
                    .setFooter({text:`Requested by ${inter.user.tag}`,iconURL:inter.user.avatarURL()})
                await inter.editReply({embeds:[ebd]});
            })
            .catch(async (err)=>{
                console.log(err)
                await inter.editReply({content:'你過勞了！請休息3小時'});
            })
  }
}