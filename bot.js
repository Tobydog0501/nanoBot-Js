const { Client, Intents } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
const discordModals = require('discord-modals');
const { Modal, TextInputComponent, showModal } = discordModals;
const path = "./token.json"
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
var afkMsg = {}


let ui = (async ()=>{
  try{
      var ui = require('./env.json')
      return new Promise(res=>{res(ui)})
  }catch{
      fs.unlink("./env.json",err=>{
          console.error(err)
      })
      let data = JSON.parse(fs.readFileSync('./backup.json', 'utf-8'))
      var dictstring = JSON.stringify(data);
      fs.writeFile("./env.json", dictstring,(err,res)=>{
      if(err){
          console.error(err)
      }else
          return new Promise(res=>{res(require('./backup.json'))})
      });
  }
})().then(()=>{
  setTimeout(()=>{
    bot.warns = new Discord.Collection()
  bot.commands = new Discord.Collection();
  bot.events = new Discord.Collection();
  ['command_handler','event_handler'].forEach(handler=>{
    require(`./handlers/${handler}`)(bot,Discord);
  })
  
  },500)
});

console.log(ui)






setInterval(async()=>{
  await fetch("https://quickest-strong-nickel.glitch.me").then(console.log('ping'))
  try{
    let data = JSON.parse(fs.readFileSync('./env.json', 'utf-8'))
    var dictstring = JSON.stringify(data);
    fs.writeFile("./backup.json", dictstring,(err,res)=>{
      if(err){
        console.error(err)
      }
    });
  }catch{
    let data = JSON.parse(fs.readFileSync('./backup.json', 'utf-8'))
    var dictstring = JSON.stringify(data);
    fs.writeFile("./env.json", dictstring,(err,res)=>{
      if(err){
        console.error(err)
      }
    });
  }

},60000)
 
bot.login(TOKEN);
