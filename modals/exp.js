const { ModalBuilder, TextInputBuilder, TextInputStyle,PermissionsBitField,ActionRowBuilder, ButtonBuilder, ButtonStyle,EmbedBuilder } = require('discord.js');
const customId = "exp"
const plu = require("../plugins/rpg_plugin")

module.exports = {
    name:customId,
    modal:new ModalBuilder()
        .setCustomId(customId)
        .setTitle("設置經驗值")
        .setComponents(
            new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setCustomId("exp-input")
                    .setLabel("設置經驗值(+增;-減;無設置)")
                    .setPlaceholder("0")
                    .setStyle(TextInputStyle.Short)
                    .setMinLength(0)
                    .setRequired(true)
            )
        ),

    async execute(modal,bot,Discord,userId){
        await modal.deferReply({ephemeral:true})
        var ret = await plu.adminExpSet(userId,modal.fields.getTextInputValue('exp-input'))
        await modal.guild.channels.fetch('993330070301180014')
          .then(async chn=>{
            let ebd = new EmbedBuilder()
              .setTitle('經驗值設置')
              .setDescription(`${modal.member}變更了<@${userId}>的經驗值`)
              .setFields([
                {name:'更動前',value:`等級：${ret['before']['lv']}\n經驗：${ret['before']['exp']}\n總經驗值：${ret['before']['totalExp']}`},
                {name:'更動後',value:`等級：${ret['after']['lv']}\n經驗：${ret['after']['exp']}\n總經驗值：${ret['after']['totalExp']}`,inline:true}
              ])
              .setFooter({iconURL:modal.user.avatarURL(),text:`Changes commited by ${modal.user.tag}`})
              .setColor('Random')
            await chn.send({embeds:[ebd]})
          })
        await modal.editReply({content:`Finished.\n已設置該使用者${modal.fields.getTextInputValue('exp-input')}經驗`,ephemeral:true})
    }

}