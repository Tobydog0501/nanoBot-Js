// var img = require('')
// const google = new img({
//   puppeteer:{
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     headless:true,
//   }
// })


module.exports = {
    name: 'image',
    description: 'Search the image on the google(Unavailable)',
    category:"unavailable",
    async execute(bot,msg, args) {
      return;
//       const query = args.join(" ");
//       if(!query) return msg.channel.send('請輸入搜尋字串')
      
//       const results = await google.scrape(query,1)
//       console.log('results', results);
//       await msg.channel.send(results[0].url)

     }
}


