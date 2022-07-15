const fetch = require('node-fetch');


module.exports = {
  name:'ping',
  category:"test",
  description:"檢視機器人延遲",
  async execute(bot,msg,args){
    await msg.channel.send('pong!')
      .then(async message=>{
    let time = message.createdTimestamp-msg.createdTimestamp;
    await message.edit({content:`pong!\n${time}ms`})});
    fetch('https://nanoBot-Js.tobydog0501.repl.co')
      .then(res=>{
        msg.channel.send('pinged the website!')
      })
      .catch(err=>{
        msg.channel.send('sussybaka')
        console.error(err)
      })
    return;
  }
}