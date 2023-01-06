const { Client, Intents } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
const discordModals = require('discord-modals');
const { Modal, TextInputComponent, showModal } = discordModals;
const path = "./token.json"
const fsPromise = require('fs/promises')
const TOKEN = fs.existsSync(path)?require(path).tkn:process.env.tkn


const bot = new Client({
    intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ] 
});
discordModals(bot);
var afkMsg = {};

(async ()=>{
  try{
    let data = JSON.parse(fs.readFileSync('./env.json', 'utf-8'));
    var dictstring = JSON.stringify(data);
  }catch{
      let data = JSON.parse(fs.readFileSync('./backup.json', 'utf-8'));
      var dictstring = JSON.stringify(data);
  }finally{
    await fsPromise.writeFile("./env.json", dictstring);
    bot.commands = new Discord.Collection();
    bot.events = new Discord.Collection();
    ['command_handler','event_handler'].forEach(handler=>{
    require(`./handlers/${handler}`)(bot,Discord);
    })
    console.log('backup reload successful!');
  }
})();


bot.login(TOKEN);