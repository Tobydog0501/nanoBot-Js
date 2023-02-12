const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const customId = "close_with_reason";
const modal = require("../modals/closeReason")

module.exports = {
    name:customId,
    description:"Close a ticket, but with reason",
    btn:new ButtonBuilder()
            .setCustomId(customId)
            .setLabel("輸入原因後關閉")
            .setStyle(ButtonStyle.Danger)
            .setEmoji('🔒'),
    
    async execute(inter,bot,Discord){
        await inter.showModal(modal.modal);
    }
        
}