module.exports = {
  name:"help",
  category:"test",
  description:"取得幫助",
  async execute(bot,msg,args,Discord){
    return
    var dict = {slashCommands:[],commands:[]};
    var cates = [];
    
    for(var i of bot.commands){
      if(i[1].data){
        if(dict.slashCommands.some(val=>val.name==i[1].data.name)) continue;
        dict.slashCommands.push({name:i[1].data.name,description:i[1].data.description});
      }else{
        if(dict.commands.some(val=>val.name==i[1].name)) continue;
        dict.commands.push({name:i[1].name,description:i[1].description,cate:i[1].category});
        if(cates.some(val=>val==i[1].category))continue;
        cates.push(i[1].category);
      }
      
      
    }
    var str = "";
    for(var x of dict.slashCommands){
      str += `${x.name}: ${x.description}\n`;
    }
    var str2 = "";
    for(var x of dict.commands){
      str2 += `${x.name}: ${x.description}\n`;
    }

    var ebd = new Discord.MessageEmbed()
      .setTitle('指令列表')
      .setDescription('以下為奈米科技的指令列表，如有任何問題，請私訊Tobydog#4180')
      .setFields([{name:'類別：',value:`slash commands,${cates.toString()}`,inline:true}])
      .setColor('RANDOM')
    var list = cates.map(val=>{
      return {label:val,value:val,description:`點擊來查看${val}類別`}
    })
    list.push({label:'斜槓指令',value:'slash',description:`點擊來查看斜槓指令類別`})
    var com = new Discord.MessageActionRow()
      .setComponents([
        new Discord.MessageSelectMenu()
          .setCustomId('help')
          .setMaxValues(1)
          .setMinValues(1)
          .setPlaceholder('選擇需要查看的類別')
          .setOptions(list)
      ])
      
    
    await msg.channel.send({embeds:[ebd],components:[com]});
    await msg.delete();
  }
}