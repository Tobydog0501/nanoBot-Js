module.exports = {
  name: "bruh",
  description: "測試用啦",
  category: "test",
  async execute(bot, msg, args, Discord) {
    if (msg.author.id != '606668363531288577')return;
    let menu = new Discord.MessageActionRow()
      .setComponents([
        new Discord.MessageSelectMenu()
          .setCustomId('specialRoles')
          .setOptions([
            { label: '深夜食堂門票', emoji: "<:Gura3:926268631522877461>", value: '926262190619643925', description: '解鎖充滿可愛天竺鼠車車的票' },
            { label: '黑暗食堂通行證', emoji: "<:Gura1:926268631581605938>", value: '926262352838529055', description: '這裡的天竺鼠車車比較可怕' }
          ])
          .setMinValues(1)
          .setPlaceholder('特殊頻道權限領取')

      ])
    let menu2 = new Discord.MessageActionRow()
      .setComponents([
        new Discord.MessageSelectMenu()
          .setCustomId('notice')
          .setOptions([
            { label: '有事請務必叫我~', emoji: "🔊", value: '926270856815071312', description: '我想接收所有伺服器通知!' },
            { label: '重要的事再找我~', emoji: "🔉", value: '926270748564291665', description: '重要的事情不要忘記叫我~' },
            { label: '我想淺水水啦!', emoji: "🔇", value: '926270913421377556', description: '不要通知我!很吵!!!' },
            { label: '我歡迎任何人Tag我唷~', emoji: "💫", value: '930797726013202482', description: '我歡迎大家有事來找我唷~' }
          ])
          .setMinValues(1)
          .setPlaceholder('通知設定')

      ])
    let meun = new Discord.MessageActionRow()
      .setComponents([
        new Discord.MessageSelectMenu()
          .setCustomId('home')
          .setOptions([
            { label: '實況主大大 ', emoji: "🪀", value: '926263379331514368', description: '原來你是實況主!' },
            { label: 'FBI，怪叔叔就是他!', emoji: "💮", value: '926272265069412362', description: '聖蘿莉共和國萬歲~' },
            { label: 'Hentai!!!', emoji: "🌡️", value: '1001401223762690088', description: 'JK真的超香的~' },
            { label: '乳不巨何以據天下', emoji: "⚜️", value: '926272273835520110', description: '御姊賽高!' },
            { label: '姊姊這裡有糖糖唷~', emoji: "🍭", value: '926272274556932116', description: '聖正太共和國萬歲~' },
            { label: '他不獸控制了!!!', emoji: "🐱", value: '926272274909237270', description: '完蛋了!!不獸控制!!!' },
            { label: 'FBI！OPEN UP！', emoji: "🕵️", value: '926272275471274046', description: 'FBI ! Open the door!!!' },
            { label: '我可以單身，但我追的CP一定要結婚', emoji: "🍿", value: '1001401869521915904', description: '這對我嗑爆!' },
            { label: '攻與受的世界', emoji: "🏳️‍🌈", value: '1001401868775329852', description: 'BL超香的好不好~' },
            { label: '百合花的山谷', emoji: "🌼", value: '1001401867751927898', description: 'GL真的超香~' },
            { label: '聖DD教的教徒~', emoji: "💞", value: '926272371583774730', description: '我就是DD!' },
            { label: '哎呀我是單推啦~', emoji: "❣️", value: '1001401866732703774', description: '我只單推啦~' },
            { label: '需要抖S找我唷~', emoji: "🦯", value: '926272372288393247', description: '需要抖S快來找我!' },
            { label: '需要抖M找我唷~', emoji: "🛡️", value: '926272406794960906', description: '需要抖M快來找我!' },
          ])
          .setMinValues(1)
          .setPlaceholder('身家調查')
      ])
    await msg.channel.send({ content: '點擊下方清單以領取**特殊頻道權限**', components: [menu] })
    await msg.channel.send({ content: '■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■\n點擊下方清單以領取**通知身分組**', components: [menu2] })
    await msg.channel.send({ content: '■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■\n點擊下方清單進行**身家調查**', components: [meun] })
    await msg.channel.send({ content: '■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■' })
  }
}