module.exports = async (Discord,bot) => {
  console.log(`${bot.user.tag} is online`);
  await bot.user.setActivity({type:"PLAYING","name":"n/help"})
//   const guild = bot.guilds.cache.get('926089413933539359')
//   setInterval(()=>{
    
//   },120000)
}