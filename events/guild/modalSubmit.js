const plu = require('../../plugins/rpg_plugin.js');

module.exports = async (Discord,bot,modal)=>{
    switch(modal.customId){
      case 'verification-modal':
        const response = modal.getTextInputValue('verification-input');
        if(response.toLowerCase()!=="lock"){
          await modal.reply({content:"認證失敗!",ephemeral: true});
          return;
        }
        modal.guild.roles.fetch('926252511201988678')
          .then(async role=>{
          await modal.member.roles.add(role);
        })
        await modal.reply({content:"認證完成!",ephemeral: true});
        break;
      case 'rename':
        await modal.channel.edit({name:`${modal.getTextInputValue('rename-input')}-${modal.channel.id.slice(-4)}`});
        await modal.reply({content:`已重新命名為${modal.channel.name.slice(0,-5)}`});
        break;
      case 'closeReason':
        let closeEbd = new Discord.MessageEmbed()
              .setTitle('關閉回報區')
              .setDescription(`問題回報區已被關閉，詳細資訊如下：`)
              .setFields([
                {name:'回報區名稱',value:modal.channel.name.slice(0,-5)},
                {name:'回報區ID',value:modal.channel.name.slice(-4),inline:true},
                {name:'開啟者',value:`<@${modal.channel.topic}>`,inline:true},
                {name:'關閉者',value:`<@${modal.member.id}>`,inline:true},
                {name:'原因',value:modal.getTextInputValue('reason-input')}
                
              ])
              .setColor([0,255,0]);
        await modal.reply('ok');
        await modal.guild.channels.fetch('926282895126040606')
          .then(async channel=>{
            await channel.send({embeds:[closeEbd]});
        });
        try{
          await modal.guild.members.fetch(modal.channel.topic)
            .then(async mem=>{
              await mem.createDM()
              .then(async channel=>{
                await channel.send({embeds:[closeEbd]});
              });
          });
        }catch{};
        await modal.channel.delete();
        break;
      default:
        if(modal.customId.startsWith('exp')){
          await modal.deferReply({ephemeral:true})
          var userId = modal.customId.split('-')[1];
          var ret = await plu.adminExpSet(userId,modal.getTextInputValue('exp-input'))
          await modal.guild.channels.fetch('993330070301180014')
            .then(async chn=>{
              let ebd = new Discord.MessageEmbed()
                .setTitle('經驗值設置')
                .setDescription(`${modal.member}變更了<@${userId}>的經驗值`)
                .setFields([
                  {name:'更動前',value:`等級：${ret['before']['lv']}\n經驗：${ret['before']['exp']}\n總經驗值：${ret['before']['totalExp']}`},
                  {name:'更動後',value:`等級：${ret['after']['lv']}\n經驗：${ret['after']['exp']}\n總經驗值：${ret['after']['totalExp']}`,inline:true}
                ])
                .setFooter({iconURL:modal.user.avatarURL(),text:`Changes commited by ${modal.user.tag}`})
                .setColor('RANDOM')
              await chn.send({embeds:[ebd]})
            })
          await modal.editReply({content:`Finished.\n已設置該使用者${modal.getTextInputValue('exp-input')}經驗`,ephemeral:true})
        }
        break;
      
  }
}
