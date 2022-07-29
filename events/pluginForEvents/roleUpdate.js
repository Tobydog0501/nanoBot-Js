const {roleUpdate} = require('../../plugins/rpg_plugin')

module.exports = async function(msg){
    var ret = await roleUpdate(msg.author.id);
    var time = 0
    var roleList = ['926265033619546163', '926265032260616273', '926265024572448798', '1001394452465713173', '1001394452394414131', '1001394453518495754', '926263909105696878', '1001395109633462314', '1001395108983345202', '1001395108396154952', '1001396563639271454', '1001396574729027654'];
    for (const i of ret['lv'].entries()){
      if(i[1]){
        if(!msg.member.roles.cache.some(v=>v.id==roleList[time])){
          await msg.member.roles.add(roleList[time])
        }
      }else{
        if(msg.member.roles.cache.some(v=>v.id==roleList[time])){
          await msg.member.roles.remove(roleList[time])
        }
      }
      time += 1;
    }
    time = 0;
    var roleList2 = ['957961007236526140', '1001397238024638524', '957961454374498374', '957961676160901131'];
    for (const topRole of ret['rank'].entries()){
      if(topRole[1]){
        if(!msg.member.roles.cache.some(v=>v.id==roleList2[time])){
          await msg.member.roles.add(roleList2[time])
        }
      }else{
        if(msg.member.roles.cache.some(v=>v.id==roleList2[time])){
          await msg.member.roles.remove(roleList2[time])
        }
      }
      time += 1;
    }
}