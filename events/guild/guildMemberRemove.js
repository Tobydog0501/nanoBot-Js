const uc = require('../pluginForEvents/updateChannel');


module.exports = async(Discord,bot,member)=>{
    await uc(member.guild);
}