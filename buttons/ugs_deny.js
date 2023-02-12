const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const customId = "udeny"

module.exports = {
    name:customId,
    description:"Rename a ticket",
    btn:new ButtonBuilder()
            .setCustomId(customId)
            .setLabel("不同意")
            .setStyle(ButtonStyle.Danger),
    
    async execute(inter,bot,Discord,memb){
        inter.deferReply({ephemeral:true});
        let mem = await inter.guild.members.fetch(memb)
        let comn2 = inter.message.components[0].toJSON().components;
        let btn2 = comn2.map(v=>{
          v.disabled = true;
          return new Discord.MessageButton(v)
        })
        let dmC = await mem.createDM().catch(async err=>{
          await inter.editReply({content:'該成員不允許私訊',ephemeral:true})
        })
        await dmC.send(`您好，經過管理員的審查後，決議不同意您加入軍火庫，如有任何問題，請開啟回報區表單`).catch(async err=>{
          await inter.editReply({content:'該成員不允許私訊',ephemeral:true})
        })
        let comm2 = new Discord.MessageActionRow().setComponents(btn2)
        await inter.message.edit({content:`已被執行\n項目：不同意加入\n更動者：${inter.member}`,embeds:inter.message.embeds,components:[comm2]})
        await inter.editReply({content:'完成'})
    }
        
}