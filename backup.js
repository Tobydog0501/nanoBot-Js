// if(msg.content.startsWith("n/")){  //指令前綴
//     var cmd = msg.content.split(" ")
//     switch(cmd[0]){
//       case "n/timeout"||"n/tt":
//         return;
//         if(cmd.length<3){
//           await msg.reply("```n/tt <userID> <time>```");
//         }
//         else{
//           await msg.guild.members.fetch(cmd[1])
//             .then(async mem=>{
//               await mem.timeout(parseInt(cmd[2])*60*1000);
//               await msg.reply(`已成功禁言${cmd[2]}分鐘`);
//             })
//             .catch(async e=>{
//               console.log(e);
//               await msg.reply("錯誤:也許是ID錯誤?");
//           });
//         }
//         return;
//         break;
//       case "n/bruh":
//         return;
//         bot.commands.get('bruh').execute(msg,cmd);
//         break;
//       case 'n/ping':
//         bot.commands.get('ping').execute(msg,cmd);
//         break;
//       case 'n/play':
//         return;
//         bot.commands.get('play').execute(msg,cmd);
//         break;
//       case 'n/stop':
//         return;
//         bot.commands.get('leave').execute(msg,cmd);
//         break;
//       case 'n/leave':
//         return;
//         bot.commands.get('leave').execute(msg,cmd);
//         break;
//       case 'n/test':
//         return;
//         await msg.delete();
//         let a = new Discord.MessageActionRow().setComponents([
//         new Discord.MessageButton()
//           .setCustomId('verify')
//           .setLabel("點擊來認證")
//           .setStyle('SUCCESS')
//         ]);
//         await msg.channel.send({content:"**點擊下方按鈕並輸入以下信息即可認證**\n▼==================▼\n```\nlock\n```\n▲==================▲",components:[a]})
//         return;
//         break;
//       case 'n/list':
//         return;
//         let list = new Discord.MessageActionRow().setComponents([
//           new Discord.MessageSelectMenu()
//             .setCustomId('role-select')
//             .setOptions([
//               {label:'競選臨時版主',value:'970323405817655327',description:"管理全域"},
//               {label:'競選臨時深夜管理',value:'972724012058824724',description:"管理深夜食堂、深夜競速、獵奇餐館、三維食堂"},
//               {label:'競選臨時圖文書庫管理',value:'972724012834783242',description:'管理圖文書庫類別'},
//               {label:'競選DD&動漫管理',value:'972726345102663751',description:"DD專區、動漫專區管理"},
//               {label:"競選臨時大廳管理",value:'972726346830725220',description:"大廳與資源管理"},
//               {label:"競選臨時遊戲管理",value:'972726347367579708',description:"管理遊戲區"}
//             ])
//             .setMaxValues(2)
//             .setPlaceholder('選擇想要競選的幹部')
//         ]);
//         await msg.channel.send({content:'**幹部競選登記**\n請點選以下清單(一人最多參選2種)，請選擇自己想參選的~ ',components:[list]});
//         break;
      
//     }
//   }