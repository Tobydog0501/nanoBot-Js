const { checkMoney } = require("../plugins/rpg_plugin")

module.exports = {
    name:'lookup',
    description:'look up ur money',
    category:"economy",
    aliases:['bank'],
    async execute(bot,msg,args,Discord){
        await checkMoney(msg.author.id)
            .then(async a=>{
                let ebd = new Discord.MessageEmbed()
                    .setTitle('帳戶金錢')
                    .setDescription(`使用者${msg.member}帳戶資訊\n帳戶錢包：${a['wallet']}元\n帳戶銀行：${a['bank']}元`)
                    .setThumbnail(msg.author.avatarURL()) //被搜尋者頭像
                    .setTimestamp()
                    .setColor('RANDOM')
                    .setFooter({text:`Request by ${msg.author.tag}`,iconURL:msg.author.avatarURL()})
                await msg.reply({embeds:[ebd]});
            })
        
    }
}