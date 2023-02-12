const { ModalBuilder, TextInputBuilder, TextInputStyle,PermissionsBitField,ActionRowBuilder, ButtonBuilder, ButtonStyle,EmbedBuilder } = require('discord.js');
const customId = "exp"

module.exports = {
    name:customId,
    modal:new ModalBuilder()
        .setCustomId(customId)
        .setTitle("設置經驗值")
        .setComponents(
            new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setCustomId("exp-input")
                    .setLabel("設置經驗值(+增;-減;無設置)")
                    .setPlaceholder("0")
                    .setStyle(TextInputStyle.Short)
                    .setMinLength(0)
                    .setRequired(true)
            )
        ),

    async execute(inter,bot,Discord){

    }

}