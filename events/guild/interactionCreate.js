const discordModals = require('discord-modals');
const rpg_plugin = require('../../plugins/rpg_plugin');
const { Modal, TextInputComponent, showModal } = discordModals;

module.exports = async(Discord,bot,inter)=>{
    if(inter.isButton()){
    switch(inter.customId){
      case 'problem':
        await inter.deferReply({ephemeral:true});
        let ebdd = new Discord.MessageEmbed()
          .setTitle('打開回報單！')
          .setDescription('請放心回報，本頻道僅**管理員和你**看得到唷。OuO\n**建議**：提供任何建議。\n**檢舉**：檢舉非法使用本伺服器的用戶。\n**回報**：回報伺服器出現的錯誤(Bug)。\n**上訴**：針對受到的處分上訴。')
          .setColor([0,255,0]);
        let btnn = new Discord.MessageActionRow().setComponents([
          new Discord.MessageButton()
            .setLabel('關閉')
            .setCustomId('close')
            .setStyle('DANGER')
            .setEmoji('🔒'),
          new Discord.MessageButton()
            .setLabel('輸入原因後關閉')
            .setCustomId('close_with_reason')
            .setStyle('DANGER')
            .setEmoji('🔒'),
          new Discord.MessageButton()
            .setLabel('重新命名')
            .setCustomId('rename')
            .setStyle('SECONDARY')
            .setEmoji('🔧')
        ])
        await inter.guild.channels.create(`ticket-`
          ,{parent:'977438906012282880', permissionOverwrites:[
            {id:inter.guild.roles.everyone,deny:[
              'VIEW_CHANNEL'
            ]}
            ,{id:inter.user,allow:[
              'VIEW_CHANNEL','SEND_MESSAGES'
            ]}
          ],topic:`${inter.member.id}`
          }).then(async channel=>{  //send the format message and button
            await channel.edit({name:`ticket-${channel.id.slice(-4)}}`});
            await channel.send({content: `<@${inter.user.id}>`,embeds:[ebdd],components:[btnn]})
            .then(async msg=>{  //pin the message
              await msg.pin();
            });
          });
        inter.editReply({content:"Finished",ephemeral:true});
        break;
      case 'close':
        let closeEbd = new Discord.MessageEmbed()
          .setTitle('關閉回報區')
          .setDescription(`問題回報區已被關閉，詳細資訊如下：`)
          .setFields([
            {name:'回報區ID',value:inter.channel.name.slice(-4),inline:true},
            {name:'開啟者',value:`<@${inter.channel.topic}>`,inline:true},
            {name:'關閉者',value:`<@${inter.member.id}>`,inline:true},
            {name:'原因',value:"沒有提供"}
            
          ])
          .setColor([0,255,0])
        inter.reply({embeds:[closeEbd]})
        await inter.guild.channels.fetch('926282895126040606')
          .then(async channel=>{
            await channel.send({embeds:[closeEbd]});
        });
        try{
          await inter.guild.members.fetch(inter.channel.topic)
            .then(async mem=>{
              await mem.createDM()
              .then(async channel=>{
                await channel.send({embeds:[closeEbd]});
              });
          });
        }catch{}
        await inter.channel.delete();
        break;
      case 'close_with_reason':
        let moda = new Modal() // We create a Modal
            .setCustomId('closeReason')
            .setTitle('關閉問題回報區')
            .addComponents([
              new TextInputComponent()
                .setCustomId('reason-input')
                .setLabel('請輸入關閉原因')
                .setStyle(2)
                .setPlaceholder('ABC')
                .setRequired(true)
          ]);

          showModal(moda, {
            client:bot,
            interaction:inter,
          });
        break;
      case 'verify':
        if(inter.member.roles.cache.some(role=>role.id=='926252511201988678')){
          await inter.reply({content:'你已經認證過了!',ephemeral: true})
          return;
        }else{
          let modal = new Modal() // We create a Modal
            .setCustomId('verification-modal')
            .setTitle('Verify yourself')
            .addComponents([
              new TextInputComponent()
                .setCustomId('verification-input')
                .setLabel('請輸入lock來認證')
                .setStyle('SHORT')
                .setMinLength(0)
                .setMaxLength(4)
                .setPlaceholder('LOCK')
                .setRequired(true)
          ]);

          showModal(modal, {
            client:bot,
            interaction:inter,
          });
        }
        break;
      case 'rename':
        let modal = new Modal()
          .setCustomId('rename')
          .setTitle('重新命名討論串')
          .addComponents([
              new TextInputComponent()
                .setCustomId('rename-input')
                .setLabel('重新命名')
                .setStyle('SHORT')
                .setMinLength(0)
                .setPlaceholder('ABC')
                .setRequired(true)
          ]);
        showModal(modal, {
            client:bot,
            interaction:inter,
          });
        break;

        case "ugs":
          await inter.deferReply({ephemeral:true});
          var rank = await rpg_plugin.rank(inter.member.id);
          let guild = await bot.guilds.fetch('965034135926226985')
          try{
            await guild.members.fetch(inter.member.id);
            await inter.editReply({content:`您已經在軍火倉庫了`,ephemeral:true});
            break;
          }catch{}
          
          if(rank['rank']['ugs']){
            inter.editReply({content:`您已經申請過了`,ephemeral:true});
            break;
          }
          if(rank['rank']['lv']>=5){
            // tell admin
            inter.guild.channels.fetch('993330070301180014')
              .then(async chn=>{
                let ebd = new Discord.MessageEmbed()
                  .setTitle('軍火倉庫加入請求')
                  .setDescription(`${inter.member}要求加入軍火倉庫\n等級：${rank['rank']['lv']}`)
                  .setColor('RANDOM')
                  .setFooter({iconURL:inter.member.user.avatarURL(),text:`Requested by ${inter.user.tag}`})
                let com = new Discord.MessageActionRow()
                  .setComponents([
                    new Discord.MessageButton()
                      .setLabel('同意')
                      .setStyle('SUCCESS')
                      .setCustomId(`uok-${inter.member.id}`),
                    new Discord.MessageButton()
                      .setLabel('不同意')
                      .setStyle('DANGER')
                      .setCustomId(`udeny-${inter.member.id}`)
                  ])
                await rpg_plugin.write(null,{'user':inter.member.id,'ugs':true});
                await chn.send({embeds:[ebd],components:[com]});
                await inter.editReply({content:`已申請，請靜候管理員回復\n若申請通過，機器人將自動傳送邀請連結`,ephemeral:true})
              })
          }else{
            await inter.editReply({content:'等級尚未達到5，請再加把勁!'});
          }
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
          await inter.guild.members.fetch(inter.customId.split('-')[1])
            .then(async mem=>{
              await mem.ban({days:1,reason:`url-spamming,執行者：${inter.member.id}`});
          })
          await inter.reply({content:'已停權該使用者',ephemeral:true})
          await inter.message.edit({content:`執行者：<@${inter.member.id}>\n執行項目：停權`,embeds:inter.message.embeds,components:[com]})
        }else if(inter.customId.startsWith('dtt-')){
          await inter.guild.members.fetch(inter.customId.split('-')[1])
            .then(async mem=>{
              await mem.createDM()
              .then(async chn=>{
                await chn.send('管理員已解除您的禁言')
              })
            await inter.reply({content:'已解除禁言',ephemeral:true})
            await inter.message.edit({content:`執行者：<@${inter.member.id}>\n執行項目：解除禁言`,embeds:inter.message.embeds,components:[com]})
            await mem.timeout(null,`執行者：${inter.member.id}`);
          })
        }else if(inter.customId.startsWith('tt-')){
          await inter.guild.members.fetch(inter.customId.split('-')[1])
            .then(async mem=>{
              await mem.createDM()
              .then(async chn=>{
                await chn.send('因為有人舉報且經管理員核實，已決議禁言您')
              })
            await inter.reply({content:'已禁言',ephemeral:true})
            await inter.message.edit({content:`執行者：<@${inter.member.id}>\n執行項目：禁言`,embeds:inter.message.embeds})
            await mem.timeout(10*60*1000,`執行者：${inter.member.id}`);
          })
        }else if(inter.customId.startsWith('uok-')){
          inter.deferReply({ephemeral:true});
          let mem = await inter.guild.members.fetch(inter.customId.split('-')[1])
          let comn = inter.message.components[0].toJSON().components;
          let btn = comn.map(v=>{
            v.disabled = true;
            return new Discord.MessageButton(v)
          })
          let comm = new Discord.MessageActionRow().setComponents(btn);
          let dmC = await mem.createDM().catch(async err=>{
            await inter.editReply({content:'該成員不允許私訊',ephemeral:true})
          })
          let invite = await bot.guilds.fetch('965034135926226985').then(async guild=>await guild.invites.create(`965038679288594512`,{maxAge:0,maxUses:1,unique:true}))
          await dmC.send(`您好，您已在剛才通過審查，此為軍火庫連結，請勿分享給他人，您只有這個連結可用\n${invite}`).catch(async err=>{
            await inter.editReply({content:'該成員不允許私訊',ephemeral:true})
          })
          await inter.message.edit({content:`已被執行\n項目：同意加入\n更動者：${inter.member}`,embeds:inter.message.embeds,components:[comm]})
          await inter.editReply({content:'完成'})
          break;
        }else if(inter.customId.startsWith('udeny-')){
          inter.deferReply({ephemeral:true});
          let mem = await inter.guild.members.fetch(inter.customId.split('-')[1])
          let comn2 = inter.message.components[0].toJSON().components;
          let btn2 = comn2.map(v=>{
            v.disabled = true;
            return new Discord.MessageButton(v)
          })
          let dmC = await mem.createDM().catch(async err=>{
            await inter.editReply({content:'該成員不允許私訊',ephemeral:true})
          })
          await dmC.send(`您好，經過管理員的審查後，決議不同意您加入軍火庫，如有任何問題，請開啟回報區表單`).catch(async err=>{
            await inter.editReply({content:'該成員不允許私訊',ephemeral:true})
          })
          let comm2 = new Discord.MessageActionRow().setComponents(btn2)
          await inter.message.edit({content:`已被執行\n項目：不同意加入\n更動者：${inter.member}`,embeds:inter.message.embeds,components:[comm2]})
          await inter.editReply({content:'完成'})
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
      await inter.deferReply({ephemeral:true})
      var roleList = []
      var check = false;
      switch(inter.customId){
        case "role-select":
          roleList = ['970323405817655327','972724012058824724','972724012834783242','972726345102663751','972726346830725220','972726347367579708'];
          break;
        case "specialRoles":
          check = true
          roleList = ["926262190619643925","926262352838529055","1003645219012624435"];
          break;
        case "notice":
          roleList = ['926270856815071312',"926270748564291665","926270913421377556","930797726013202482","1003984713440055347"];
          break;
        case "home":
          roleList = ['926263379331514368', '926272265069412362', '1001401223762690088', '926272273835520110', '926272274556932116', '926272274909237270', '926272275471274046', '1001401869521915904', '1001401868775329852', '1001401867751927898', '926272371583774730', '1001401866732703774', '926272372288393247', '926272406794960906'];
          break;
        
      }
      var newRoleList = roleList.filter(val=>!inter.values.some(vaul=>vaul==val))
      for(var i in newRoleList){
        await inter.member.roles.remove(newRoleList[i]);
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