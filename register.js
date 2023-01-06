const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const path = "./token.json"
const token = process.env.tkn
const TOKEN = fs.existsSync(path)?require(path).tkn:process.env.tkn

var commands = [];


// Place your client and guild ids here
const clientId = token?'991152087054426132':'991301253269291078';
const guildId = '926089413933539359';

module.exports = async (reset)=>{
  const SlashcommandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));
  const rest = new REST({ version: '9' }).setToken(TOKEN);

  (async () => {
    for (const file of SlashcommandFiles) {
    const command = require(`./slashCommands/${file}`);
    commands.push(command.data.toJSON());
    }
    if(reset) commands = [];
    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
      );

      console.log('Successfully reloaded application (/) commands.');
      return('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error)
      return(`Unsuccessful. Reason:${error}`);
    }
  })();
}