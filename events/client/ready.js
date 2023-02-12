const fetch = require('node-fetch');
const controller = new AbortController();
const { signal } = controller;
const request = require('request')
const keep_alive = require('../../keep_alive.js')
const activities_list = [
  { type: 'Listening',  message: '怎麼罷工才不會被發現🔑'  },
  { type: 'Watching', message: 'RPG系統編寫進度😏' },
  { type: 'Watching', message: '香香的圖片❤' },
  { type: 'Watching', message: '偷懶的小風💤' },
  { type: 'Playing', message: '自己的指令(?🐋' },
  { type: 'Watching', message: 'Never gonna give you up' },
  { type: 'Watching', message: '有沒有人傳瑟瑟連結🧐' },
  { type: 'Competing', message: '罷工第一名寶座💎' },
  { type: 'Playing',  message: '罷工遊戲(?🎢'  },
  { type: 'Playing', message: '跑去讀書的珍奶📞📞📞'}
];

module.exports = async (Discord,bot) => {
  keep_alive();
  console.log(`${bot.user.tag} is online`);
  await bot.user.setActivity({type:"PLAYING","name":"n/help"})
  setInterval(async()=>{
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    bot.user.setActivity(activities_list[index].message, { type: activities_list[index].type });
  },30000)

  
//   const guild = bot.guilds.cache.get('926089413933539359')
//   setInterval(()=>{
    
//   },120000)
}