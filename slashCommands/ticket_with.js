const { SlashCommandBuilder } = require('@discordjs/builders');
const fsPromise = require('fs/promises');
const fs = require('fs');

module.exports = {
    data:new SlashCommandBuilder()
	    .setName('ticket_with')
	    .setDescription('開啟與某人的回報區')
        .addStringOption(option =>
            option.setName('成員')
                .setDescription('成員ID或提及他')
                .setRequired(true))
    ,
    async execute(inter,Discord){
      await inter.deferReply({ephemeral:true});
        var target = inter.options.get('成員').value.replace('<@!','').replace('>','');
        if(target.length!=18){
            inter.reply('這不是個Snowflake!');
            return
        }
        
        var member = await inter.guild.members.fetch(target);
        let ebdd = new Discord.MessageEmbed()
          .setTitle('打開回報單！')
          .setDescription('請放心回報，本頻道僅**管理員和你**看得到唷。OuO\n**建議**：提供任何建議。\n**檢舉**：檢舉非法使用本伺服器的用戶。\n**回報**：回報伺服器出現的錯誤(Bug)。\n**上訴**：針對受到的處分上訴。')
          .setColor([0,255,0]);
        let btnn = new Discord.MessageActionRow().setComponents([
          new Discord.MessageButton()
            .setLabel('關閉')
            .setCustomId('close')
            .setStyle('DANGER')
            .setEmoji('🔒'),
          new Discord.MessageButton()
            .setLabel('輸入原因後關閉')
            .setCustomId('close_with_reason')
            .setStyle('DANGER')
            .setEmoji('🔒'),
          new Discord.MessageButton()
            .setLabel('重新命名')
            .setCustomId('rename')
            .setStyle('SECONDARY')
            .setEmoji('🔧')
        ])
        await inter.guild.channels.create(`ticket-`
          ,{parent:'977438906012282880', permissionOverwrites:[
            {id:inter.guild.roles.everyone,deny:[
                'VIEW_CHANNEL'
            ]}
            ,{id:inter.user,allow:[
                'VIEW_CHANNEL','SEND_MESSAGES'
            ]}
            ,{id:member,allow:[
                'VIEW_CHANNEL','SEND_MESSAGES'
            ]}
          ],topic:`${target}`
          }).then(async channel=>{  //send the format message and button
            await channel.edit({name:`ticket-${channel.id.slice(-4)}}`});
            await channel.send({content: `<@${inter.user.id}>,<@${target}>`,embeds:[ebdd],components:[btnn]})
            .then(async msg=>{  //pin the message
              await msg.pin();
            });
          });
        inter.editReply({content:"Finished",ephemeral:true});
    }
}
