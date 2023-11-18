const discordModals = require('discord-modals');
const rpg_plugin = require('../../plugins/rpg_plugin');
const fs = require('fs');
const Discord = require("discord.js");
const { Modal, TextInputComponent, showModal } = discordModals;


/**
 * 
 * @param {Discord} Discord 
 * @param {Discord.Client} bot 
 * @param {Discord.Interaction} inter 
 */
module.exports = async(Discord,bot,inter)=>{

  if(inter.isButton()){
    // bot.buttons = new Discord.Collection();
    const btns = fs.readdirSync('./buttons/').filter(file => file.endsWith('.js'));
    const customId = inter.customId.split("-")
    for(const file of btns){
      const command = require(`../../buttons/${file}`);
      if(command.name==customId[0]){
        try{
          await buttons.execute(inter,bot,Discord,customId[1]?customId[1]:undefined);
        }catch(err){
          await inter.reply({content:"好像哪裡有問題...",ephemeral:true}).catch(async err=>{
            await inter.editReply({content:"好像哪裡有問題...",ephemeral:true});
          });
          console.error(err);
        }
      }else{
        continue;
      }
    }
    // const buttons = bot.buttons.get(customId[0]);
    // if(buttons){
    //   try{
    //     await buttons.execute(inter,bot,Discord,customId[1]?customId[1]:undefined);
    //   }catch(err){
    //     await inter.reply({content:"好像哪裡有問題...",ephemeral:true}).catch(async err=>{
    //       await inter.editReply({content:"好像哪裡有問題...",ephemeral:true});
    //     });
    //     console.error(err);
    //   }
    // }
    // bot.buttons = null;
  }else if(inter.isStringSelectMenu()){
    const menus = fs.readdirSync('./selectMenus/').filter(file=>file.endsWith('.js'));
    const customId = inter.customId.split("-")
    for(const file of menus){
      const command = require(`../../selectMenus/${file}`);
      if(command.name==customId[0]){
        try{
          await menu.execute(inter,bot,Discord,customId[1]?customId[1]:undefined);
        }catch(err){
          await inter.reply({content:"好像哪裡有問題...",ephemeral:true});
          console.error(err);
        }
      }else{
        continue;
      }
    }
    // const menu = bot.menus.get(customId[0]);
    // if(menu){

    // }
    // bot.menu = null;
  }else if(inter.isModalSubmit()){
    // bot.modals = new Discord.Collection();
    const modals = fs.readdirSync('./modals/').filter(file=>file.endsWith('.js'));
    const customId = inter.customId.split("-")
    for(const file of modals){
      const command = require(`../../modals/${file}`);
      if(command.name){
        // bot.modals.set(command.name,command);
        try{
          await command.execute(inter,bot,Discord,customId[1]?customId[1]:undefined);
        }catch(err){
          await inter.reply({content:"好像哪裡有問題...",ephemeral:true});
          console.error(err);
  
        }
      }else{
        continue;
      }
    }
    // const modal = bot.modals.get(customId[0]);
    // if(modal){
    //   try{
    //     await modal.execute(inter,bot,Discord,customId[1]?customId[1]:undefined);
    //   }catch(err){
    //     await inter.reply({content:"好像哪裡有問題...",ephemeral:true});
    //     console.error(err);

    //   }
    // }

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