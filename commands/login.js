const { login } = require("../plugins/rpg_plugin")

module.exports = {
    name:'login',
    description:'login to earn money',
    category:"economy",
    async execute(bot,msg,args,Discord){
        await login(msg.author.id)
            .then(async a=>{
                let ebd = new Discord.MessageEmbed()
                    .setTitle('每日簽到')
                    .setDescription(`登入成功！明天也請記得來簽到喔\n帳戶錢包：${a['wallet']}\n帳戶銀行：${a['bank']?a['bank']:0}`)
                    .setThumbnail(msg.author.avatarURL()) //被搜尋者頭像
                    .setTimestamp()
                    .setColor('RANDOM')
                    .setFooter({text:`Requested by ${msg.author.tag}`,iconURL:msg.author.avatarURL()})
                await msg.reply({embeds:[ebd]});
            })
            .catch(async (err)=>{
                await msg.reply(err);
            })
        
    }
}