
module.exports = {
  name:'destroy',
  category:"special",
  description:'DESTROY THE BOT',
  aliases:['des'],
  async execute(bot,msg,args){
    if(msg.author.id=='606668363531288577'){
      await msg.reply('機器人自我毀滅按鈕已啟動(強制重啟中)');
      await bot.destroy();
    }else{
      await msg.reply('你沒有權限使用此指令!')
    }
  }
}