module.exports = {
    name:'undergroundstorage',
    description:'get sussy invite',
    category:"test",
    aliases:['ugs'],
    async execute(bot,msg,args,Discord){
        if (msg.author.id!='606668363531288577')return;
        let com = new Discord.MessageActionRow()
            .setComponents([
                new Discord.MessageButton()
                    .setLabel('點擊來獲取邀請連結')
                    .setStyle("SUCCESS")
                    .setCustomId('ugs')
            ])
        await msg.channel.send({content:"**恭喜你達到了地下倉庫的入門標準!!**\n現在你可以按我下方的按鈕來加入軍火倉庫了~\n\n**以下警告WARNING!!**\n> 1.**嚴格禁止**去散佈獲得的邀請連結\n> 2.每人僅能**領取乙次**邀請連結，需要重複領取請私信管理。\n> 3.請**__允許__來自伺服器成員的私人信息**\n> 4.加入後請**__詳細閱讀__ 版規!**",components:[com]})
    }
}