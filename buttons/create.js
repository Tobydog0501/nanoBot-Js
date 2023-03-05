const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const customId = "create";
const modal = require("../modals/create.js")

module.exports = {
    name:customId,
    description:"Create a channel",
    btn:new ButtonBuilder()
            .setCustomId(customId)
            .setLabel("建立頻道")
            .setStyle(ButtonStyle.Success)
            .setEmoji('🔨'),
    
    async execute(inter,bot,Discord){
        await inter.showModal(modal.modal);
    }
        
}