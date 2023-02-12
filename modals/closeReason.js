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

    async execute(modal,bot,Discord){
        let closeEbd = new EmbedBuilder()
            .setTitle('關閉回報區')
            .setDescription(`問題回報區已被關閉，詳細資訊如下：`)
            .setFields([
            {name:'回報區名稱',value:modal.channel.name.slice(0,-5)},
            {name:'回報區ID',value:modal.channel.name.slice(-4),inline:true},
            {name:'開啟者',value:`<@${modal.channel.topic}>`,inline:true},
            {name:'關閉者',value:`<@${modal.member.id}>`,inline:true},
            {name:'原因',value:modal.getTextInputValue('reason-input')}
            
            ])
            .setColor([0,255,0]);
        await modal.reply('ok');
        await modal.guild.channels.fetch('926282895126040606')
            .then(async channel=>{
            await channel.send({embeds:[closeEbd]});
        });
        try{
            await modal.guild.members.fetch(modal.channel.topic)
            .then(async mem=>{
                await mem.createDM()
                .then(async channel=>{
                await channel.send({embeds:[closeEbd]});
                });
            });
        }catch{};
        await modal.channel.delete();
    }

}