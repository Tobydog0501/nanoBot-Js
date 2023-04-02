const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const customId = "close"
module.exports = {
    name:customId,
    description:"Close a ticket, but without reason",
    btn:new ButtonBuilder()
            .setCustomId(customId)
            .setLabel("關閉")
            .setStyle(ButtonStyle.Danger)
            .setEmoji('🔒'),
    
    async execute(inter,bot,Discord){
        let closeEbd = new EmbedBuilder()
          .setTitle('關閉回報區')
          .setDescription(`問題回報區已被關閉，詳細資訊如下：`)
          .setFields([
            {name:'回報區ID',value:inter.channel.name.slice(-4),inline:true},
            {name:'開啟者',value:`<@${inter.channel.topic}>`,inline:true},
            {name:'關閉者',value:`<@${inter.member.id}>`,inline:true},
            {name:'原因',value:"沒有提供"}
            
          ])
          .setColor([0,255,0])
        inter.reply({embeds:[closeEbd]})
        await inter.guild.channels.fetch('926282895126040606')
          .then(async channel=>{
            await channel.send({embeds:[closeEbd]});
        });
        try{
          await inter.guild.members.fetch(inter.channel.topic)
            .then(async mem=>{
              await mem.createDM()
              .then(async channel=>{
                await channel.send({embeds:[closeEbd]});
              });
          });
        }catch{}
        await inter.channel.delete();
    }
        
}