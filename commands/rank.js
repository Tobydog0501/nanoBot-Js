const plu = require('../rpg_plugin')


module.exports = {
    name:'rank',
    category:"rpg",
    description:"檢視使用者等級",
    aliases:['ra','exp','lv','level'],
    async execute(bot,msg,args,Discord){
        var userId = args[0]?args[0]:msg.author.id;
        await msg.channel.send('Fetching data...')
            .then(async Emsg=>{
                await plu.rank(userId)
                    .then(async ui=>{
                        await plu.expAmount(userId)
                            .then(async expAmounts=>{
                                let embed = new Discord.MessageEmbed()
                                .setTitle('等級查詢')
                                .setDescription(`目前等級：${ui['lv']}\n經驗值：${ui['exp']}\n總經驗值：${expAmounts}`)   //可能要用%
                                .setThumbnail(args[0]?msg.guild.members.fetch(args[0]).avatarURL():msg.author.avatarURL()) //被搜尋者頭像
                                .setColor('RANDOM')
                            await Emsg.edit({embeds:[embed]})
                            })
                        
                    })
            })
       

    }
}