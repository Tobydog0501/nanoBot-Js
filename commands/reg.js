module.exports = {
  name:'reg',
  description:"Register the slash commands",
  category:"test",
  aliases:['register','re'],
  async execute(bot,msg,args){
    await msg.channel.send('Reloading slash command...')
    const a = require('../register.js')
    console.log(args.length==0)
    var ret = await a(args.length!=0?true:false);
    await msg.channel.send('Slash command reload successful!')
  }
}