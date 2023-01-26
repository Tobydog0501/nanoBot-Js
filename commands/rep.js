const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const btn = require("../buttons/problem")

module.exports = {
    name:'rep',
    description:'reportBtn',
    category:"test",
    async execute(bot,msg,args,Discord){
        if (msg.author.id!='606668363531288577')return;
        var com = new ActionRowBuilder()
            .setComponents([
                btn.btn
            ])
        var ebd = new EmbedBuilder()
            .setTitle('打開回報單！')
            .setDescription('此頻道為： 建議／檢舉／回報／上訴用途頻道\n按下下方的藍色按鈕就可以創建安全的回報單了。')
            .setImage('https://media.discordapp.net/attachments/957177628383641621/978192943976431636/43203ceb2bbffb62.jpg')
            .setFooter({text:`Powered by Tobydog#4180`,iconURL:msg.author.avatarURL()})
        await msg.channel.send({embeds:[ebd],components:[com]})
    }
}