const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const customId = "ban"

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
        //         await mem.ban({days:1,reason:`url-spamming,執行者：${inter.member.id}`});
        //     })
        // await inter.reply({content:'已停權該使用者',ephemeral:true})
        // await inter.message.edit({content:`執行者：<@${inter.member.id}>\n執行項目：停權`,embeds:inter.message.embeds,components:[com]})
    }
        
}