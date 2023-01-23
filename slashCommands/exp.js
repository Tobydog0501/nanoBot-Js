const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const modal = require("../modals/exp");

module.exports = {
  data:new ContextMenuCommandBuilder()
        .setName('設置經驗值')
        .setType(ApplicationCommandType.User),

	async execute(inter,Discord,bot){
        if(!inter.memberPermissions.has('MANAGE_ROLES')){
            return
        }
        
        await inter.showModal(modal.modal);
	}
}