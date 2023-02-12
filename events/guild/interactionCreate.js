const discordModals = require('discord-modals');
const rpg_plugin = require('../../plugins/rpg_plugin');
const { Modal, TextInputComponent, showModal } = discordModals;

module.exports = async(Discord,bot,inter)=>{

  if(inter.isButton()){
    let customId = inter.customId.split("-")
    const buttons = bot.buttons.get(customId[0]);
    if(buttons){
      try{
        await buttons.execute(inter,bot,Discord,customId[1]?customId[1]:undefined);
      }catch(err){
        await inter.reply({content:"好像哪裡有問題...",ephemeral:true});
        console.error(err);
      }
    }
  }else if(inter.isStringSelectMenu()){
    let customId = inter.customId.split("-")
    const menu = bot.menus.get(customId[0]);
    if(menu){
      try{
        await menu.execute(inter,bot,Discord,customId[1]?customId[1]:undefined);
      }catch(err){
        await inter.reply({content:"好像哪裡有問題...",ephemeral:true});
        console.error(err);
      }
    }
  }else if(inter.isModalSubmit()){
    let customId = inter.customId.split("-")
    const modal = bot.menus.get(customId[0]);
    if(modal){
      try{
        await modal.execute(inter,bot,Discord,customId[1]?customId[1]:undefined);
      }catch(err){
        await inter.reply({content:"好像哪裡有問題...",ephemeral:true});
        console.error(err);

      }
      for(i in inter.values){
        await inter.member.roles.add(inter.values[i]);
      }
      await inter.editReply({content:'已成功新增身分組',ephemeral:true});
    }

  }else if(inter.isCommand()||inter.isContextMenu()){

      const slashCommand = bot.commands.get(inter.commandName)
      if(slashCommand){
        try{
          await slashCommand.execute(inter,Discord,bot);
        }catch(err){
          await inter.reply({content:"好像哪裡有問題...",ephemeral:true})
          console.error(err)
        }
      }

      
    }
  
}