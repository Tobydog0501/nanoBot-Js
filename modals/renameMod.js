const { ModalBuilder, TextInputBuilder, TextInputStyle,PermissionsBitField,ActionRowBuilder, ButtonBuilder, ButtonStyle,EmbedBuilder } = require('discord.js');
const customId = "rename"

module.exports = {
    name:customId,
    modal:new ModalBuilder()
        .setCustomId(customId)
        .setTitle("重新命名討論串")
        .setComponents(
            new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setCustomId("rename-input")
                    .setLabel("重新命名")
                    .setStyle(TextInputStyle.Short)
                    .setMinLength(0)
                    .setRequired(true)
            )
        ),

    async execute(modal,bot,Discord){
        await modal.channel.edit({name:`${modal.fields.getTextInputValue('rename-input')}-${modal.channel.id.slice(-4)}`});
        await modal.reply({content:`已重新命名為${modal.channel.name.slice(0,-5)}`});
    }

}