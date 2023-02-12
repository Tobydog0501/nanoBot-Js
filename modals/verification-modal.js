const { ModalBuilder, TextInputBuilder, TextInputStyle,PermissionsBitField,ActionRowBuilder, ButtonBuilder, ButtonStyle,EmbedBuilder } = require('discord.js');
const customId = "verification-modal"

module.exports = {
    name:customId,
    modal:new ModalBuilder()
        .setCustomId(customId)
        .setTitle("Verify yourself")
        .setComponents(
            new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setCustomId("verification-input")
                    .setLabel("請輸入lock來認證")
                    .setPlaceholder("LOCK")
                    .setStyle(TextInputStyle.Short)
                    .setMinLength(0)
                    .setMaxLength(4)
                    .setRequired(true)
            )
        ),

    async execute(inter,bot,Discord){

    }

}