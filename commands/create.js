const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const btn = require("../buttons/create");

module.exports = {
    name:'create',
    category:"special",
    description:'call out a btn',

    async execute(bot,msg,args){
        const com = new ActionRowBuilder()
            .setComponents([btn.btn]);

        msg.channel.send({content:"待修改",components:[com]});

    }
  }