const fs = require('fs');

const commands = [];

module.exports = (bot,Discord) =>{
  const SlashcommandFiles = fs.readdirSync('./slashCommands/').filter(file => file.endsWith('.js'));
  const buttons = fs.readdirSync('./buttons/').filter(file => file.endsWith('.js'));
  const commandFiles = fs.readdirSync('./commands/').filter(file=>file.endsWith('.js'));
  const modals = fs.readdirSync('./modals/').filter(file=>file.endsWith('.js'));
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

  for(const file of buttons){
    const command = require(`../buttons/${file}`);
    if(command.name){
      bot.buttons.set(command.name,command);
    }else{
      continue;
    }
  }
  for(const file of modals){
    const command = require(`../modals/${file}`);
    if(command.name){
      bot.modals.set(command.name,command);
    }else{
      continue;
    }
  }
}