const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const customId = "rename"
const modal = require("../modals/renameMod")

module.exports = {
    name:customId,
    description:"Rename a ticket",
    btn:new ButtonBuilder()
            .setCustomId(customId)
            .setLabel("重新命名")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('🔧'),
    
    async execute(inter,bot,Discord){
        await inter.showModal(modal.modal);
    }
        
}