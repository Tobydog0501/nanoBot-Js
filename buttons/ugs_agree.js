const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const customId = "uok"

module.exports = {
    name:customId,
    description:"Rename a ticket",
    btn:new ButtonBuilder()
            .setCustomId(customId)
            .setLabel("同意")
            .setStyle(ButtonStyle.Success),
    
    async execute(inter,bot,Discord,memb){
        inter.deferReply({ephemeral:true});
        let mem = await inter.guild.members.fetch(memb)
        let comn = inter.message.components[0].toJSON().components;
        let btn = comn.map(v=>{
          v.disabled = true;
          return new ButtonBuilder.from(v)
        })
        let comm = new ActionRowBuilder.setComponents(btn);
        let dmC = await mem.createDM().catch(async err=>{
          await inter.editReply({content:'該成員不允許私訊',ephemeral:true})
        })
        let invite = await bot.guilds.fetch('965034135926226985').then(async guild=>await guild.invites.create(`965038679288594512`,{maxAge:0,maxUses:1,unique:true}))
        await dmC.send(`您好，您已在剛才通過審查，此為軍火庫連結，請勿分享給他人，您只有這個連結可用\n${invite}`).catch(async err=>{
          await inter.editReply({content:'該成員不允許私訊',ephemeral:true})
        })
        await inter.message.edit({content:`已被執行\n項目：同意加入\n更動者：${inter.member}`,embeds:inter.message.embeds,components:[comm]})
        await inter.editReply({content:'完成'})
    }
        
}