const { ModalBuilder, TextInputBuilder, TextInputStyle,PermissionsBitField,ActionRowBuilder, ButtonBuilder, ButtonStyle,EmbedBuilder } = require('discord.js');
const customId = "closeReason"

module.exports = {
    name:customId,
    modal:new ModalBuilder()
        .setCustomId(customId)
        .setTitle("Reason")
        .setComponents(
            new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setCustomId("reason-input")
                    .setLabel("請輸入關閉原因")
                    .setPlaceholder("abc")
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(true)
            )
        ),

    async execute(inter,bot,Discord){

    }

}