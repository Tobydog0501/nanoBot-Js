const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const plu = require('../plugins/rpg_plugin');
const r_u_ac = require('../events/pluginForEvents/roleUpdate')

module.exports = {
    name:'rrrr',
    category:"rpg",
    description:"檢視使用者等級",
    aliases:['ra','exp','lv','level'],
    async execute(bot,msg,args,Discord){
        // var userId = args[0]?args[0].replace('<@','').replace('>',''):msg.author.id;
        var userId = msg.author.id;
        await msg.reply('Fetching data...')
            .then(async Emsg=>{
                var ui = await plu.rank(userId);
                var abc = ['']
                var emoji = '';
                await msg.guild.members.fetch(userId)
                    .then(async user=>{
                        let ava = await user.user.avatarURL();
                        let embed = new EmbedBuilder()
                            .setTitle('等級查詢')
                            .setDescription(`目前等級：${ui['rank']['lv']}\n經驗值：${ui['rank']['exp']}\n總經驗值：${ui['rank']['totalExp']}\n\n等級進度：||${ui['per']} (${ui['req']})||`)   //可能要用%
                            .setThumbnail(ava) //被搜尋者頭像
                            .setColor('Random')
                            .setFooter({text:`Requested by ${msg.author.tag}`,iconURL:msg.author.avatarURL()})
                        await Emsg.edit({content:'獲取資料成功!',embeds:[embed]});
                        await r_u_ac(msg,userId);
                    })
                    .catch(async err=>{
                        console.warn(err);
                        await Emsg.edit({content:'Unable to find user'});
                    })
            })
       

    }
}