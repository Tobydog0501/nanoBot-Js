module.exports = {
    name:"uptime",
    category:"test",
    description:"取得機器人上線時間",
    aliases:['ut','up'],
    async execute(bot,msg,args,Discord){
        const uptimeDays = Math.floor(bot.uptime/(1000*60*60*24));
        const uptimeHour = Math.floor(bot.uptime/(1000*60*60))-uptimeDays*24;
        const uptimeMin = Math.floor(bot.uptime/(1000*60))-uptimeHour*60;
        const uptimeSec = Math.floor(bot.uptime/1000)-uptimeMin*60;
        const uptimeMs = bot.uptime-uptimeSec*1000;
        const now = Date.now();
        const lastReady = new Date(now-bot.uptime);
        let ebd = new Discord.MessageEmbed()
            .setTitle('機器人上線資訊')
            .setFields([
                {name:'上次準備完成時間',value:`${lastReady.getFullYear()}/${lastReady.getMonth()}/${lastReady.getDate()} ${lastReady.getHours()}:${lastReady.getMinutes().toString.length==1?`0${lastReady.getMinutes()}`:lastReady.getMinutes()}`,inline:true},
                {name:'總上線時間',value:`${uptimeDays}天 ${uptimeHour}小時 ${uptimeMin}分鐘 ${uptimeSec}.${uptimeMs}秒`,inline:false},
            ])
        await msg.reply({embeds:[ebd]})
    }
  }