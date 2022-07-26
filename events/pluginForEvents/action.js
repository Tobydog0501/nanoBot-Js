module.exports = async function action(Discord,bot,msg){
    var coll = bot.warns.filter(times=>times.times>=5)
      coll.forEach(async (v,k)=>{
        await msg.guild.members.fetch(k)
          .then(async mem=>{
          await mem.timeout((v.reason=='刷頻連結'?30:60)*60*1000,v.reason)
            .catch(console.error)
          await mem.createDM()
            .then(async chn=>{
              await chn.send(`您因為${v.reason}而被禁言${v.reason=='刷頻連結'?'30':'60'}分鐘`);
          })
          bot.warns.set(msg.author.id,0)
          await msg.guild.channels.fetch('972464113290711050')
            .then(async channel=>{
              await channel.send({content:'<@989184598632181801>',embeds:[new Discord.MessageEmbed().setTitle('懲處').setDescription(v.reason=='刷頻連結'?`<@${k}>因傳送${v.times}次可疑連結而被禁言30分鐘\n連結：${msg.content}`:`<@${k}>因傳送${v.times}次疑似token之訊息而被禁言60分鐘`)],
                                 components:[new Discord.MessageActionRow().setComponents([
                                   new Discord.MessageButton()
                                     .setCustomId(`dtt-${k}`)
                                     .setLabel('解除禁言')
                                     .setStyle("SUCCESS"),
                                   new Discord.MessageButton()
                                     .setCustomId(`ban-${k}`)
                                     .setLabel('停權使用者')
                                     .setStyle("DANGER")
                                 ])]})
                                 
          })
        })
      })
      await msg.delete();  //偵測可疑連結刪除
  }