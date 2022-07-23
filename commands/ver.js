module.exports = {
    name:'ver',
    description:'verify',
    category:"test",
    async execute(bot,msg,args,Discord){
        //return;
        let com = new Discord.MessageActionRow()
            .setComponents([
                new Discord.MessageButton()
                    .setLabel('點擊來認證')
                    .setStyle("SUCCESS")
                    .setCustomId('verify')
            ])
        await msg.channel.send({content:"**點擊下方按鈕並輸入以下信息即可認證**\n**▼==================▼**\n```lock```\n**▲==================▲**\n\n若點擊按鈕顯示`交互失敗`，請等待<@991152087054426132>上線\n||或者私訊<@606668363531288577>||",components:[com]})
    }
}