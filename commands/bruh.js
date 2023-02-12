const {ActionRowBuilder} = require("discord.js");
const select1 = require("../selectMenus/specialRoles")
const select2 = require("../selectMenus/notice")
const select3 = require("../selectMenus/home")

module.exports = {
  name: "bruh",
  description: "測試用啦",
  category: "test",
  async execute(bot, msg, args, Discord) {
    if (msg.author.id != '606668363531288577') return;
    let menu = new ActionRowBuilder()
      .setComponents([
        select1.menu
      ])
    let menu2 = new ActionRowBuilder()
      .setComponents([
        select2.menu
      ])
    let meun = new ActionRowBuilder()
      .setComponents([
        select3.menu
      ])
    await msg.channel.send({ content: '點擊下方清單以領取**特殊頻道權限**', components: [menu] })
    await msg.channel.send({ content: '■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■\n點擊下方清單以領取**通知身分組**', components: [menu2] })
    await msg.channel.send({ content: '■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■\n點擊下方清單進行**身家調查**', components: [meun] })
    await msg.channel.send({ content: '■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■' })
  }
}