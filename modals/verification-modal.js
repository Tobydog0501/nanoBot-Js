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

    async execute(modal,bot,Discord){
        const response = modal.getTextInputValue('verification-input');
        if(response.toLowerCase()!=="lock"){
          await modal.reply({content:"認證失敗!",ephemeral: true});
          return;
        }
        modal.guild.roles.fetch('926252511201988678')
          .then(async role=>{
          await modal.member.roles.add(role);
        })
        await modal.reply({content:"認證完成!",ephemeral: true});
    }

}