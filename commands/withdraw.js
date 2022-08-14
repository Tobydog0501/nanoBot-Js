const { withdraw } = require("../plugins/rpg_plugin")

module.exports = {
    name:'withdraw',
    description:'withdraw to wallet',
    category:"economy",
    aliases:['wd'],
    async execute(bot,msg,args,Discord){
        if(typeof parseInt(args[0]) == NaN||args[0]==undefined){
            await msg.reply('請輸入要領多少錢');
            return;
        }
        await withdraw(msg.author.id,parseInt(args[0]))
            .then(async a=>{
                let ebd = new Discord.MessageEmbed()
                    .setTitle('取款成功')
                    .setDescription(`帳戶錢包：${a['wallet']}\n帳戶銀行：${a['bank']}`)
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