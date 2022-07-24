module.exports = {
  name:'reg',
  description:"Register the slash commands",
  category:"test",
  aliases:['register','re'],
  async execute(bot,msg,args){
    if (msg.author.id!='606668363531288577')return;
    await msg.channel.send('Reloading slash command...')
    const reg = require('../plugins/register')
    await reg(args.length!=0?true:false)
      .then(async m=>{
        await msg.channel.send('Successfully reloaded');
      })
      .catch(async err=>{
        console.error(err);
        await msg.channel.send(`Something went wrong`);
      })
      
    
  }
}