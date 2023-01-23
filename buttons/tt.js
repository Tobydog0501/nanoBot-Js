const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const customId = "dtt"

module.exports = {
    name:customId,
    description:"Rename a ticket",
    btn:undefined,
    // new ButtonBuilder()
    //         .setCustomId(customId)
    //         .setLabel("同意")
    //         .setStyle(ButtonStyle.Success),
    
    async execute(inter,bot,Discord,mem){
        await inter.guild.members.fetch(mem)
            .then(async mem=>{
                await mem.createDM()
                    .then(async chn=>{
                        await chn.send('因為有人舉報且經管理員核實，已決議禁言您')
                    })
            await inter.reply({content:'已禁言',ephemeral:true})
            await inter.message.edit({content:`執行者：<@${inter.member.id}>\n執行項目：禁言`,embeds:inter.message.embeds})
            await mem.timeout(10*60*1000,`執行者：${inter.member.id}`);
            })
    }
        
}