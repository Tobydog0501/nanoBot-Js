const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data:new SlashCommandBuilder()
	      .setName('suggest')
	      .setDescription('提出建議')
      	.addStringOption(option =>
	      	option.setName('建議')
	      		.setDescription('你的建議')
	      		.setRequired(true)),
  async execute(inter,Discord){
    let ebd = new Discord.MessageEmbed()
          .setTitle('成員建議')
          .setDescription(inter.options.get('建議').value)
          .setFooter({text:inter.user.tag})
          .setColor([255,255,0])
        await inter.guild.channels.fetch('980109237244006450')
          .then(async channel=>{
            await channel.send({embeds:[ebd]})
        })
        await inter.reply({content:"已建議管理層，感謝您的建議",ephemeral:true})
  }
}