const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = process.env.tkn

const commands = [];


// Place your client and guild ids here
const clientId = '926255596129382430';
const guildId = '926089413933539359';

module.exports = (bot,Discord) =>{
  const SlashcommandFiles = fs.readdirSync('./slashCommands/').filter(file => file.endsWith('.js'));
  const commandFiles = fs.readdirSync('./commands/').filter(file=>file.endsWith('.js'));
  for (const file of SlashcommandFiles) {
    const command = require(`../slashCommands/${file}`);
    commands.push(command.data.toJSON());
    bot.commands.set(command.data.name,command)
  }
  

  for(const file of commandFiles){
    const command = require(`../commands/${file}`);
    if(command.name){
      bot.commands.set(command.name,command);
      if(command.aliases){
        for(var aliases of command.aliases){
          bot.commands.set(aliases,command);
        }
      }
    }else{
      continue;
    }
  }
}