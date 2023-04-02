const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const request = require("request-promise")
var cheerio = require("cheerio");

async function jp(search,inter) {
  await request({
    url: `https://www.google.com.tw/search?q=${search}&hl=zh-TW&authuser=0&tbm=isch&sxsrf=AJOqlzVS5O0zjOiE7x06bhxtNPZd8jfmFw%3A1676791090345&source=hp&biw=1495&bih=723&ei=Ms3xY8KaEoKI-AaO1Zi4Dg&iflsig=AK50M_UAAAAAY_HbQqkJLiEkadrfIW8YctPJ4vyM4ySi&ved=0ahUKEwjC-7LKhaH9AhUCBN4KHY4qBucQ4dUDCAY&uact=5&oq=dog&gs_lcp=CgNpbWcQAzIECCMQJzIICAAQgAQQsQMyBQgAEIAEMgUIABCABDIICAAQgAQQsQMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABFAAWM0HYMQIaABwAHgAgAFIiAHLAZIBATOYAQCgAQGqAQtnd3Mtd2l6LWltZw&sclient=img`,
    method: "GET"
  }, async function(error, response, body) {
    if (error || !body) {
        return
    } else {

    // 爬完網頁後要做的事情
    // console.log(body)
    var $ = cheerio.load(body);
    var target = $(`img`);
    var results = [];
    for(tar of target){
      if(tar.attribs.src.includes("https"))
        results.push(tar.attribs.src)
    }
    // console.log(results)
    
    const result = results[Math.floor(Math.random()*results.length)];
    // console.log(result)
    let ebd = new EmbedBuilder()
          .setTitle('圖片')
          .setImage(result)
          .setFooter({text:inter.user.tag})
          .setColor("Random");
        
    await inter.editReply({embeds:[ebd]})
    }
  });
};

module.exports = {
  data:new SlashCommandBuilder()
	      .setName('picture')
	      .setDescription('搜圖')
      	.addStringOption(option =>
	      	option.setName('關鍵字')
	      		.setDescription('請輸入關鍵字')
	      		.setRequired(true)),
  async execute(inter,Discord){
    await inter.deferReply()
    const search = inter.options.get('關鍵字').value
    await jp(search,inter)
    
  }
}