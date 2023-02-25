const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const customId = "remove_role"


module.exports = {
    name:customId,
    description:"remove noob role",
    btn:new ButtonBuilder()
            .setCustomId(customId)
            .setLabel("結束新手教程")
            .setStyle(ButtonStyle.Success)
            .setEmoji('🔧'),
    
    async execute(inter,bot,Discord){
        await inter.deferReply({ephemeral:true})
        await inter.member.roles.remove("1076456202080370748")
        await inter.editReply({content:"已成功移除"})
    }
        
}