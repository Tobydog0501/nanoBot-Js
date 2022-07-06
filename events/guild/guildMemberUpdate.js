const uc = require('../pluginForEvents/updateChannel');


module.exports = async(Discord,bot,oMember,nMember)=>{
    await uc(nMember.guild);
}