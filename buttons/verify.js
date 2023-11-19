const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const customId = "verify"
const modal = require("../modals/verification-modal")

module.exports = {
    name:customId,
    btn:new ButtonBuilder()
        .setCustomId(customId)
        .setLabel("點擊來認證")
        .setStyle(ButtonStyle.Success),

    async execute(inter,bot,Discord){
        if(inter.member.roles.cache.some(role=>role.id=='926252511201988678')){
            await inter.reply({content:'你已經認證過了!',ephemeral: true})
            return;
          }else{
            await inter.showModal(modal.modal);
        }
    }
}