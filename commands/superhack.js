const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const agree = require("../buttons/ugs_agree")
const deny = require("../buttons/ugs_deny")

module.exports = {
    name:'hack',
    description:'testing',
    category:"test",
    async execute(bot,msg,args,Discord){
        if (msg.member.id!="606668363531288577")
            return
        
        let com = new ActionRowBuilder()
            .setComponents([
            agree.btn.setCustomId(`uok-${msg.member.id}`),
            deny.btn.setCustomId(`udeny-${msg.member.id}`)
            ])

        await msg.channel.send({content:"ssss",components:[com]});

        
    }
}