const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
    data:new ContextMenuCommandBuilder()
	.setName('舉報使用者')
	.setType(ApplicationCommandType.Message),
	async execute(inter,Discord){
		return
		await inter.guild.channels.fetch('926282895126040606')
			.then(async chn=>{
				await inter.channel.messages.fetch(inter.targetId)
					.then(async msg=>{
						let btns = new Discord.MessageActionRow()
							.setComponents([
								new Discord.MessageButton()
                                   .setCustomId(`ignor-${inter.member.id}`)
                                   .setLabel('忽略此舉報')
                                   .setStyle("SUCCESS"),
                                 new Discord.MessageButton()
                                   .setCustomId(`tt-${inter.member.id}`)
                                   .setLabel('禁言使用者')
                                   .setStyle("DANGER")
							])
						let ebd = new Discord.MessageEmbed()
							.setTitle('使用者舉報')
							.setFields([
								{name:'舉報者',value:`<@${inter.user.id}>(${inter.user.tag})`},
								{name:'被舉報者',value:`<@${msg.member.id}>(${msg.member.user.tag})`,inline:true},
								{name:'訊息',value:msg.content}
							])
							.setColor([200,0,0])
					await chn.send({embeds:[ebd],components:[btns]})
						})
				
			})
		await inter.reply({content:'以檢舉此人',ephemeral:true})
	}
}