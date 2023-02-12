const { ActionRowBuilder, Events, StringSelectMenuBuilder } = require('discord.js');
const customId = "specialRoles";

module.exports = {
    name:customId,
    menu:new StringSelectMenuBuilder()
            .setCustomId(customId)
            .setPlaceholder('特殊頻道權限領取')
            .addOptions(
                { label: '深夜食堂門票', emoji: "<:Gura3:926268631522877461>", value: '926262190619643925', description: '解鎖充滿可愛天竺鼠車車的票' },
                { label: '地下酒窖通行', emoji: "<:Gura1:926268631581605938>", value: '926262352838529055', description: '這裡的天竺鼠車車比較深奧' },
                { label: '你就是封弊者!', emoji: "🍻", value: '1003645219012624435', description: '解鎖公測區域，可以參與伺服器不穩定功能的公測' }
            )
            .setMinValues(1),

    async execute(inter,bot,Discord){
        await inter.deferReply({ephemeral:true});
        let roles = ["926262190619643925","926262352838529055","1003645219012624435"];
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