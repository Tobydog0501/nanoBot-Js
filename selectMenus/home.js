const { ActionRowBuilder, Events, StringSelectMenuBuilder } = require('discord.js');
const customId = "home";

module.exports = {
    name:customId,
    menu:new StringSelectMenuBuilder()
            .setCustomId(customId)
            .setPlaceholder('身家調查')
            .addOptions(
                { label: '實況主大大 ', emoji: "🪀", value: '926263379331514368', description: '原來你是實況主!' },
                { label: 'FBI，怪叔叔就是他!', emoji: "💮", value: '926272265069412362', description: '聖蘿莉共和國萬歲~' },
                { label: 'Hentai!!!', emoji: "🌡️", value: '1001401223762690088', description: 'JK真的超香的~' },
                { label: '乳不巨何以據天下', emoji: "⚜️", value: '926272273835520110', description: '御姊賽高!' },
                { label: '姊姊這裡有糖糖唷~', emoji: "🍭", value: '926272274556932116', description: '聖正太共和國萬歲~' },
                { label: '他不獸控制了!!!', emoji: "🐱", value: '926272274909237270', description: '完蛋了!!不獸控制!!!' },
                { label: 'FBI！OPEN UP！', emoji: "🕵️", value: '926272275471274046', description: 'FBI ! Open the door!!!' },
                { label: '我可以單身，但我追的CP一定要結婚', emoji: "🍿", value: '1001401869521915904', description: '這對我嗑爆!' },
                { label: '攻與受的世界', emoji: "🏳️‍🌈", value: '1001401868775329852', description: 'BL超香的好不好~' },
                { label: '百合花的山谷', emoji: "🌼", value: '1001401867751927898', description: 'GL真的超香~' },
                { label: '聖DD教的教徒~', emoji: "💞", value: '926272371583774730', description: '我就是DD!' },
                { label: '哎呀我是單推啦~', emoji: "❣️", value: '1001401866732703774', description: '我只單推啦~' },
                { label: '需要抖S找我唷~', emoji: "🦯", value: '926272372288393247', description: '需要抖S快來找我!' },
                { label: '需要抖M找我唷~', emoji: "🛡️", value: '926272406794960906', description: '需要抖M快來找我!' },
            )
            .setMinValues(1)
            .setMaxValues(14),

    async execute(inter,bot,Discord){
        await inter.deferReply({ephemeral:true});
        let roles = ['926263379331514368', '926272265069412362', '1001401223762690088', '926272273835520110', '926272274556932116', '926272274909237270', '926272275471274046', '1001401869521915904', '1001401868775329852', '1001401867751927898', '926272371583774730', '1001401866732703774', '926272372288393247', '926272406794960906'];
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