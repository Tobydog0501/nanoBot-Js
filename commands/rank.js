const plu = require('../plugins/rpg_plugin');


module.exports = {
    name:'rank',
    category:"rpg",
    description:"檢視使用者等級",
    aliases:['ra','exp','lv','level'],
    async execute(bot,msg,args,Discord){
        var userId = args[0]?args[0].replace('<@','').replace('>',''):msg.author.id;
        await msg.reply('Fetching data...')
            .then(async Emsg=>{
                await plu.rank(userId)
                    .then(async ui=>{
                        await msg.guild.members.fetch(userId)
                            .then(async user=>{
                                let ava = await user.user.avatarURL();
                                let embed = new Discord.MessageEmbed()
                                    .setTitle('等級查詢')
                                    .setDescription(`目前等級：${ui['lv']}\n經驗值：${ui['exp']}\n總經驗值：${ui['totalExp']}`)   //可能要用%
                                    .setThumbnail(ava) //被搜尋者頭像
                                    .setColor('RANDOM')
                                await Emsg.edit({content:'獲取資料成功!',embeds:[embed]});
                            })
                    })
                    .catch(async err=>{
                        console.warn(err);
                        await Emsg.edit({content:'Unable to find user'});
                    })
            })
       

    }
}