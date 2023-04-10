const { ContextMenuCommandBuilder, ApplicationCommandType,ContextMenuCommandInteraction } = require('discord.js');
const modal = require("../modals/exp");

module.exports = {
  data:new ContextMenuCommandBuilder()
        .setName('設置經驗值')
        .setType(ApplicationCommandType.User),

        /**
         * 
         * @param {ContextMenuCommandInteraction} inter 
         * @param {*} Discord 
         * @param {*} bot 
         * @returns 
         */

	async execute(inter,Discord,bot){
        if(!inter.memberPermissions.has('MANAGE_ROLES')){
            return
        }
        modal.modal.setCustomId(`exp-${inter.targetId}`)
        await inter.showModal(modal.modal);
	}
}