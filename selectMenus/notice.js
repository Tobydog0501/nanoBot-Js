const { ActionRowBuilder, Events, StringSelectMenuBuilder } = require('discord.js');
const customId = "notice";

module.exports = {
    name:customId,
    menu:new StringSelectMenuBuilder()
            .setCustomId(customId)
            .setPlaceholder('通知設定')
            .addOptions(
                { label: '有事請務必叫我~', emoji: "🔊", value: '926270856815071312', description: '我想接收所有伺服器通知!' },
                { label: '重要的事再找我~', emoji: "🔉", value: '926270748564291665', description: '重要的事情不要忘記叫我~' },
                { label: '機器人更新就找我~', emoji: "🔱", value: '1003984713440055347', description: '機器人的更新我要知道!' },
                { label: '我想淺水水啦!', emoji: "🔇", value: '926270913421377556', description: '不要通知我!很吵!!!' },
                { label: '我歡迎任何人Tag我唷~', emoji: "💫", value: '930797726013202482', description: '我歡迎大家有事來找我唷~' }
            )
            .setMinValues(1)
            .setMaxValues(5),

    async execute(inter,bot,Discord){
        await inter.deferReply({ephemeral:true});
        let roles = ['926270856815071312',"926270748564291665","926270913421377556","930797726013202482","1003984713440055347"];
        for(let role of roles){
            if(!inter.values.includes(role)){
                inter.member.roles.remove(role);
            }else{
                inter.member.roles.add(role);
            }
        }
        await inter.editReply({content:'已成功新增身分組',ephemeral:true});
    }
}