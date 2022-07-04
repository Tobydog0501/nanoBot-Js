module.exports = {
    name:'ver',
    description:'verify',
    category:"test",
    async execute(bot,msg,args,Discord){
        return;
        let com = new Discord.MessageActionRow()
            .setComponents([
                new Discord.MessageButton()
                    .setLabel('點擊來認證')
                    .setStyle("SUCCESS")
                    .setCustomId('verify')
            ])
        await msg.channel.send({content:"**點擊下方按鈕並輸入以下信息即可認證**\n**▼==================▼**\n```lock```\n\n**▲==================▲**",components:[com]})
    }
}