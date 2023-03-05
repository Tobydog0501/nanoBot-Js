const { ModalBuilder, TextInputBuilder, TextInputStyle,PermissionsBitField,ActionRowBuilder, ButtonBuilder, ButtonStyle,EmbedBuilder ,StringSelectMenuBuilder} = require('discord.js');
const customId = "create"

module.exports = {
    name:customId,
    modal:new ModalBuilder()
        .setCustomId(customId)
        .setTitle("建立頻道")
        .setComponents([
            new ActionRowBuilder().setComponents([
                new TextInputBuilder()
                    .setCustomId("channelName")
                    .setLabel("請輸入頻道名稱")
                    .setPlaceholder("abc")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true),
            ]),
            new ActionRowBuilder().setComponents([
                new TextInputBuilder()
                    .setCustomId("bloody")
                    .setLabel("是否存在大量血腥(Y/N)")
                    .setPlaceholder("N")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true),
            ]),
            new ActionRowBuilder().setComponents([
                new TextInputBuilder()
                    .setCustomId("nsfw")
                    .setLabel("是否為成人內容(Y/N)")
                    .setPlaceholder("N")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true),
            ])
            ]),

    async execute(modal,bot,Discord){
        await modal.reply("sus")
    }

}