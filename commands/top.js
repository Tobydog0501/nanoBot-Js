const plu = require('../rpg_plugin')


module.exports = {
    name:'top',
    category:"rpg",
    description:"檢視使用者等級排行",
    async execute(bot,msg,args,Discord){
        if(args.length==0||args[0].length<18){    //have page
            await plu.tops((args.length==0||args[0]==0)?1:args[0])
                .then(async lists=>{
                    var index = (((args.length==0||args[0]==0)?1:args[0])-1)*10+1;
                    var str = "";
                    try{
                        for(var i = index;i<=(index+9);i++){
                            if(lists[i-1]==undefined) continue
                            str += `#${i} | <@${lists[i-1]['userId']}>XP:${lists[i-1]['rank']['totalExp']}\n`
                        }
                        str += '✨更多?```n/top page```\n✨查詢特定使用者排名?```n/top user(mention or id)```'
                        let embed = new Discord.MessageEmbed()
                            .setTitle('排行榜查詢')
                            .setDescription(str)
                            .setColor('RANDOM')
                            .setTimestamp()
                            .setFooter({iconURL:msg.author.avatarURL(),text:`Request by ${msg.author.tag}`})
                        await msg.reply({embeds:[embed]});
                    }catch(e){
                        console.error(e)
                    }
                })
        }else{
            let user = args[0].replace('<@','').replace('>','');
            await plu.tops(null,user)
                .then(async rank=>{
                    await msg.reply(`使用者<@${user}>排名：${rank}`)
                })
                .catch(async err=>{
                    await msg.reply(err);
                })
        }
    }
}