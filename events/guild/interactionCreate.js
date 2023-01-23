const discordModals = require('discord-modals');
const rpg_plugin = require('../../plugins/rpg_plugin');
const { Modal, TextInputComponent, showModal } = discordModals;

module.exports = async(Discord,bot,inter)=>{
    if(inter.isButton()){
    switch(inter.customId){
      case 'problem':
        
        break;
      case 'close':
        
        break;
      case 'close_with_reason':
        break;
      case 'verify':
        
        break;
      case 'rename':
        break;

        case "ugs":
          
          break;
      

      default:
        let com = new Discord.MessageActionRow().setComponents([
                                 new Discord.MessageButton()
                                   .setCustomId(`dtt`)
                                   .setLabel('解除禁言')
                                   .setStyle("SUCCESS")
                                   .setDisabled(true),
                                 new Discord.MessageButton()
                                   .setCustomId(`ban`)
                                   .setLabel('停權使用者')
                                   .setStyle("DANGER")
                                   .setDisabled(true)
                               ])
        if(inter.customId.startsWith('ban-')){
          
        }else if(inter.customId.startsWith('dtt-')){
          
        }else if(inter.customId.startsWith('tt-')){
          
        }else if(inter.customId.startsWith('uok-')){
          
          break;
        }else if(inter.customId.startsWith('udeny-')){
          
          break;
        }
        break;
    }
  }else if(inter.isSelectMenu()){
    if(inter.customId=="help"){
      var dict = {slashCommands:[],commands:[]};
      for(var i of bot.commands){
        if(i[1].data){
          if(dict.slashCommands.some(val=>val.name==i[1].data.name)) continue;
          dict.slashCommands.push({name:i[1].data.name,description:i[1].data.description});
        }else{
          if(dict.commands.some(val=>val.name==i[1].name)) continue;
          dict.commands.push({name:i[1].name,description:i[1].description,cate:i[1].category});
        }
      }
      let ret = dict.commands.filter(v=>v['cate']==inter.values)
      console.log(ret)
    }else{
      
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