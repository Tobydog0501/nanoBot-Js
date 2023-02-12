const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const customId = "rename"
const rpg_plugin = require('../plugins/rpg_plugin');
const agree = require("./ugs_agree")
const deny = require("./ugs_deny")

module.exports = {
    name:customId,
    btn:new ButtonBuilder()
        .setLabel('點擊來獲取邀請連結')
        .setStyle(ButtonStyle.Success)
        .setCustomId(customId),

    async execute(inter,bot,Discord){
        await inter.deferReply({ephemeral:true});
        var rank = await rpg_plugin.rank(inter.member.id);
        let guild = await bot.guilds.fetch('965034135926226985')
        try{
            await guild.members.fetch(inter.member.id);
            await inter.editReply({content:`您已經在軍火倉庫了`,ephemeral:true});
            return;
        }catch{}
        
        if(rank['rank']['ugs']){
            inter.editReply({content:`您已經申請過了`,ephemeral:true});
            return;
        }
        if(rank['rank']['lv']>=5){
        // tell admin
            inter.guild.channels.fetch('993330070301180014')
                .then(async chn=>{
                    let ebd = new Discord.MessageEmbed()
                        .setTitle('軍火倉庫加入請求')
                        .setDescription(`${inter.member}要求加入軍火倉庫\n等級：${rank['rank']['lv']}`)
                        .setColor('RANDOM')
                        .setFooter({iconURL:inter.member.user.avatarURL(),text:`Requested by ${inter.user.tag}`})
                    let com = new Discord.MessageActionRow()
                        .setComponents([
                        agree.btn.setCustomId(`uok-${inter.member.id}`),
                        deny.btn.setCustomId(`udeny-${inter.member.id}`)
                        ])
                    await rpg_plugin.write(null,{'user':inter.member.id,'ugs':true});
                    await chn.send({embeds:[ebd],components:[com]});
                    await inter.editReply({content:`已申請，請靜候管理員回復\n若申請通過，機器人將自動傳送邀請連結`,ephemeral:true})
                })
        }else{
            await inter.editReply({content:'等級尚未達到5，請再加把勁!'});
        }
    }
}