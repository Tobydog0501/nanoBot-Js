const { deposit } = require("../plugins/rpg_plugin")

module.exports = {
    name:'deposit',
    description:'deposit to bank',
    category:"economy",
    aliases:['de'],
    async execute(bot,msg,args,Discord){
        if(typeof parseInt(args[0]) == NaN||args[0]==undefined){
            await msg.reply('請輸入要存多少錢');
            return;
        }
        await deposit(msg.author.id,parseInt(args[0]))
            .then(async a=>{
                let ebd = new Discord.MessageEmbed()
                    .setTitle('存款成功')
                    .setDescription(`帳戶錢包：${a['wallet']}\n帳戶銀行：${a['bank']}`)
                    .setThumbnail(msg.author.avatarURL()) //被搜尋者頭像
                    .setTimestamp()
                    .setColor('RANDOM')
                await msg.reply({embeds:[ebd]});
            })
            .catch(async (err)=>{
                await msg.reply(err);
            })
        
    }
}