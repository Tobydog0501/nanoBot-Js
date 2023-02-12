const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const plu = require('../plugins/rpg_plugin');
const r_u_ac = require('../events/pluginForEvents/roleUpdate')

module.exports = {
  data:new SlashCommandBuilder()
	      .setName('rank')
	      .setDescription('查詢等級'),

  async execute(inter,Discord){
    // var userId = args[0]?args[0].replace('<@','').replace('>',''):inter.user.id;
    var userId = inter.user.id;
    await inter.deferReply()
    var ui = await plu.rank(userId);
    var abc = ['']
    var emoji = '';
    await inter.guild.members.fetch(userId)
        .then(async user=>{
            let ava = await user.user.avatarURL();
            let embed = new EmbedBuilder()
                .setTitle('等級查詢')
                .setDescription(`目前等級：${ui['rank']['lv']}\n經驗值：${ui['rank']['exp']}\n總經驗值：${ui['rank']['totalExp']}\n\n等級進度：||${ui['per']} (${ui['req']})||`)   //可能要用%
                .setThumbnail(ava) //被搜尋者頭像
                .setColor('Random')
                .setFooter({text:`Requested by ${inter.user.tag}`,iconURL:inter.user.avatarURL()})
            await inter.editReply({content:'獲取資料成功!',embeds:[embed]});
            await r_u_ac(inter,userId);
        })
        .catch(async err=>{
            console.warn(err);
            await inter.editReply({content:'Unable to find user'});
        })
  }
}