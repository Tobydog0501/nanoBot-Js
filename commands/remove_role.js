const {ActionRowBuilder} = require("discord.js");
const btn = require("../buttons/remove_role");

module.exports = {
  name: "rev",
  description: "測試用啦",
  category: "test",
  async execute(bot, msg, args, Discord) {
    if (msg.author.id != '606668363531288577') return;
    let com = new ActionRowBuilder()
      .setComponents([
        btn.btn
      ])
    await msg.channel.send("https://cdn.discordapp.com/attachments/926251574555209768/1078979602547998730/94cf0ff72b099e0b.jpg")
    await msg.channel.send({ content: '**不再顯示本區**\n*恭喜你完成了新手教程，現在的你是一個可以獨當一面的香民了，請點擊下方的按鈕來關閉教程吧，讓我們誠摯的祝福您*', components: [com] })
  }
}