// module.exports = async(Discord,bot,member)=>{
//   if(member.guild.id != '926089413933539359'){
//     return
//   }
//   try{
//     await member.createDM()
//       .then(async chann=>{
//       await chann.send("你好~歡迎來到香香的，\n記得先去<#926089960308736020>閱讀版規並領取**人民身分組**以獲取完整功能唷，\n我們歡迎你的加入!ヾ(≧▽≦*)o\n \n \n快速了解這個伺服器`n/help`");
//     })
//   }catch{}
//   member.guild.channels.fetch('926091412829765673').then(async channel=>{
//     let embed = new Discord.MessageEmbed()
//     .setTitle(`**Hola~${member.user.tag}~歡迎你加入我們香香的~**`)  //標題
//     .setDescription(`<@${member.id}>，別忘了去認證唷`)
//     .setColor([0,0,0]);
//     channel.send({embeds:[embed]});
//   });  //channel的ID
// }