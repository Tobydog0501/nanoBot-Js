const uc = require('../pluginForEvents/updateChannel');
const fetch = require('node-fetch');
const controller = new AbortController();
const { signal } = controller;
const keep_alive = require('../../keep_alive.js')

module.exports = async (Discord,bot) => {
  console.log(`${bot.user.tag} is online`);
  await bot.user.setActivity({type:"PLAYING","name":"n/help"})
  setInterval(()=>{
    var timeoutId = setTimeout(()=>{controller.abort()},5000)
    fetch('https://nanoBot-Js.tobydog0501.repl.co',{signal})
      .then(res=>{
        console.log('pinged')
        clearTimeout(timeoutId)
      })
      .catch(err=>{
        console.log('restart server')
        clearTimeout(timeoutId)
        console.error(err)
        keep_alive();
      })
  },120000)

  
//   const guild = bot.guilds.cache.get('926089413933539359')
//   setInterval(()=>{
    
//   },120000)
}