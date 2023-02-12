const { ActionRowBuilder, Events, StringSelectMenuBuilder } = require('discord.js');
const customId = "help";

module.exports = {
    name:customId,
    menu:new StringSelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Nothing selected')
            .addOptions(
                {
                    label: 'Select me',
                    description: 'This is a description',
                    value: 'first_option',
                },
                {
                    label: 'You can select me too',
                    description: 'This is also a description',
                    value: 'second_option',
                },
            ),
}