const uc = require('../pluginForEvents/updateChannel');


module.exports = async(Discord,bot,member)=>{
    if(member.guild.id != '926089413933539359'){
        return
      }
    await uc(member.guild);
}