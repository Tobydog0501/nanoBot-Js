const { work } = require("../plugins/rpg_plugin")

module.exports = {
    name:'work',
    description:'work to earn money',
    category:"economy",
    async execute(bot,msg,args,Discord){
        await work(msg.author.id)
            .then(async a=>{
                let ebd = new Discord.MessageEmbed()
                    .setTitle('工作結果')
                    .setDescription(`恭喜你藉由工作獲得了${a}元`)
                    .setThumbnail(msg.author.avatarURL()) //被搜尋者頭像
                    .setTimestamp()
                    .setColor('RANDOM')
                    .setFooter({text:`Requested by ${msg.author.tag}`,iconURL:msg.author.avatarURL()})
                await msg.reply({embeds:[ebd]});
            })
            .catch(async (err)=>{
                await msg.reply('你過勞了！請休息3小時');
            })
        
    }
}