module.exports = {
  name:'ping',
  category:"test",
  description:"檢視機器人延遲",
  async execute(bot,msg,args){
    await msg.channel.send('pong!')
      .then(async message=>{
    let time = message.createdTimestamp-msg.createdTimestamp;
    await message.edit({content:`pong!\n${time}ms`})});
    return;
  }
}