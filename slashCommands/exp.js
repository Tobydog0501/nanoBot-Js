const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const discordModals = require('discord-modals');
const { Modal, TextInputComponent, showModal } = discordModals;

module.exports = {
    data:new ContextMenuCommandBuilder()
	.setName('設置經驗值')
	.setType(2),
	async execute(inter,Discord,bot){
        if(!inter.memberPermissions.has('MANAGE_ROLES')){
            return
        }
        let modal = new Modal()
        .setCustomId(`exp-${inter.targetId}`)
        .setTitle('設置經驗值')
        .addComponents([
            new TextInputComponent()
              .setCustomId('exp-input')
              .setLabel('設置經驗值(+增;-減;無設置)')
              .setStyle('SHORT')
              .setMinLength(0)
              .setPlaceholder('0')
              .setRequired(true)
        ]);
        showModal(modal, {
          client:bot,
          interaction:inter,
        });
	}
}