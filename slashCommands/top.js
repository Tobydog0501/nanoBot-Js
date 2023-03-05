const plu = require('../plugins/rpg_plugin')

const r_u_ac = require('../events/pluginForEvents/roleUpdate');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');


module.exports = {
    data:new SlashCommandBuilder()
	    .setName('top')
	    .setDescription('檢視使用者等級排行')
      	.addStringOption(option =>
	      	option.setName('頁碼')
	      		.setDescription('查詢頁碼')
	      		.setRequired(false))
        .addStringOption(option =>
            option.setName('使用者')
                .setDescription('特定使用者')
                .setRequired(false)),

    async execute(inter,Discord){
        const page = inter.options.get('頁碼')?inter.options.get('頁碼').value:null;
        const user = inter.options.get('使用者')?inter.options.get('使用者').value.replace("<@","").replace(">",""):null;
        if(!user){    //have page
            await plu.tops((!page)?1:page)
                .then(async lists=>{
                    const index = (((!page)?1:page)-1)*10+1;
                    var str = "";
                    try{
                        for(var i = index;i<=(index+9);i++){
                            if(lists[i-1]==undefined) continue
                            str += `#${i} | <@${lists[i-1]['userId']}>XP:${lists[i-1]['rank']['totalExp']}\n`
                        }
                        str += '✨更多?```/top <page>```\n✨查詢特定使用者排名?```n/top <user(mention or id)>```'
                        let embed = new EmbedBuilder()
                            .setTitle('排行榜查詢')
                            .setDescription(str)
                            .setColor('Random')
                            .setTimestamp()
                            .setFooter({iconURL:inter.user.avatarURL(),text:`Request by ${inter.user.tag}`})
                        await inter.reply({embeds:[embed]});
                        await r_u_ac(inter,inter.member.id)
                    }catch(e){
                        console.error(e)
                    }
                })
        }else{
            await plu.tops(null,user)
                .then(async rank=>{
                    await inter.reply(`使用者<@${user}>排名：${rank}`)
                    await r_u_ac(inter,user);
                })
                .catch(async err=>{
                    await inter.reply(err);
                })
        }
    }
}
