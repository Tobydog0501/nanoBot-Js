const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const customId = "dtt"

module.exports = {
    name:customId,
    description:"Rename a ticket",
    btn:undefined,
    // new ButtonBuilder()
    //         .setCustomId(customId)
    //         .setLabel("同意")
    //         .setStyle(ButtonStyle.Success),
    
    async execute(inter,bot,Discord,mem){
        // await inter.guild.members.fetch(mem)
        //     .then(async mem=>{
        //         await mem.createDM()
        //         .then(async chn=>{
        //             await chn.send('管理員已解除您的禁言');
        //         })
        //     await inter.reply({content:'已解除禁言',ephemeral:true})
        //     await inter.message.edit({content:`執行者：<@${inter.member.id}>\n執行項目：解除禁言`,embeds:inter.message.embeds,components:[com]})
        //     await mem.timeout(null,`執行者：${inter.member.id}`);
        //     })
    }
        
}