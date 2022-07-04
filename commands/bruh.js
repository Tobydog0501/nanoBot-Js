module.exports = {
    name:"bruh",
    description:"測試用啦",
    category:"test",
    async execute(bot,msg,args,Discord){
        return;
      let menu = new Discord.MessageActionRow()
        .setComponents([
            new Discord.MessageSelectMenu()
                .setCustomId('specialRoles')
                .setOptions([
                    {label:'駕照',emoji:"<:Gura3:926268631522877461>",value:'926262190619643925',description:'用於解鎖深夜專區成人頻道(R18)'},
                    {label:'高鐵通行證',emoji:"<:Gura1:926268631581605938>",value:'926262352838529055',description:'用於解鎖獵奇深夜專區(R18-G)'}
                ])
                .setMinValues(1)
                .setPlaceholder('特殊頻道權限領取')
            
        ])
        let menu2 = new Discord.MessageActionRow()
        .setComponents([
            new Discord.MessageSelectMenu()
            .setCustomId('notice')
            .setOptions([
                {label:'通知全開',emoji:"🔊",value:'926270856815071312',description:'接收所有伺服器通知(包含投票、非相關公告、小知識)'},
                {label:'僅限重要通知',emoji:"🔉",value:'926270748564291665',description:'接受伺服器重大更新通知(包含重要或緊急公告)'},
                {label:'不要通知',emoji:"🔇",value:'926270913421377556',description:'不接受任何通知'},
                {label:'允許被mention',emoji:"💫",value:'930797726013202482',description:'允許被其他一般成員直接Tag'}
            ])
            .setMinValues(1)
            .setPlaceholder('通知設定')

        ])
        let meun = new Discord.MessageActionRow()
        .setComponents([
            new Discord.MessageSelectMenu()
            .setCustomId('home')
            .setOptions([
                {label:'蘿莉控',emoji:"💮",value:'926272265069412362',description:'神聖的蘿莉控'},
                {label:'御姊控',emoji:"⚜️",value:'926272273835520110',description:'神聖的御姊控'},
                {label:'正太控',emoji:"🌀",value:'926272274556932116',description:'神聖的正太控'},
                {label:'FURRY控',emoji:"🐱",value:'926272274909237270',description:'神聖的FURRY控'},
                {label:'FBI',emoji:"🕵️",value:'926272275471274046',description:'邪惡的FBI(?'},
                {label:'DD',emoji:"💞",value:'926272371583774730',description:'神聖的DD'},
                {label:'抖S',emoji:"🦯",value:'926272372288393247',description:'神聖的抖S'},
                {label:'抖M ',emoji:"🛡️",value:'926272406794960906',description:'神聖的抖M'}
            ])
            .setMinValues(1)
            .setPlaceholder('身家調查')
        ])
    await msg.channel.send({content:'點擊下方清單以領取**特殊頻道權限**',components:[menu]})
    await msg.channel.send({content:'■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■\n點擊下方清單以領取**通知身分組**',components:[menu2]})
    await msg.channel.send({content:'■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■\n點擊下方清單進行**身家調查**',components:[meun]})
    await msg.channel.send({content:'■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■'})
    }
  }