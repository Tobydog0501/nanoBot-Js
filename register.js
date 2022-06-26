const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = process.env.tkn

const commands = [];


// Place your client and guild ids here
const clientId = '926255596129382430';
const guildId = '926089413933539359';

module.exports = async ()=>{
  const SlashcommandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));
  const rest = new REST({ version: '9' }).setToken(token);

  (async () => {
    for (const file of SlashcommandFiles) {
    const command = require(`./slashCommands/${file}`);
    commands.push(command.data.toJSON());
    }
    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
      );

      console.log('Successfully reloaded application (/) commands.');
      return('Successfully reloaded application (/) commands.');
    } catch (error) {
      
      return(`Unsuccessful. Reason:${error}`);
    }
  })();
}