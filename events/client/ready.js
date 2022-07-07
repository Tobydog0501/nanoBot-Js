const uc = require('../pluginForEvents/updateChannel');


module.exports = async (Discord,bot) => {
  console.log(`${bot.user.tag} is online`);
  await bot.user.setActivity({type:"PLAYING","name":"n/help"})
  
  let guild = await bot.guilds.fetch('926089413933539359');
  await uc(guild);

  setInterval(async()=>{
    await uc(guild);
  },120000)
  
//   const guild = bot.guilds.cache.get('926089413933539359')
//   setInterval(()=>{
    
//   },120000)
}