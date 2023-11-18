const fs = require('fs');

const commands = [];

module.exports = (bot,Discord) =>{
  const SlashcommandFiles = fs.readdirSync('./slashCommands/').filter(file => file.endsWith('.js'));

  for (const file of SlashcommandFiles) {
    const command = require(`../slashCommands/${file}`);
    commands.push(command.data.toJSON());
    bot.commands.set(command.data.name,command)
  }

}