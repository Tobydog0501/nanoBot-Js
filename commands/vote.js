module.exports = {
    name:"vote",
    description:"測試用啦",
    category:"test",
    async execute(bot,msg,args,Discord){
        if (msg.author.id!='606668363531288577')return;
        let meun = new Discord.MessageActionRow()
        .setComponents([
            new Discord.MessageSelectMenu()
            .setCustomId('role-select')
            .setOptions([
                //{label:名稱,value:身分組ID,description:描述}
                {label:'臨時版主候選人',value:'970323405817655327',description:'神聖的蘿莉控'},
                {label:'御姊控',emoji:"⚜️",value:'926272273835520110',description:'神聖的御姊控'},
                {label:'正太控',emoji:"🌀",value:'926272274556932116',description:'神聖的正太控'},
                {label:'FURRY控',emoji:"🐱",value:'926272274909237270',description:'神聖的FURRY控'},
                {label:'FBI',emoji:"🕵️",value:'926272275471274046',description:'邪惡的FBI(?'},
                {label:'DD',emoji:"💞",value:'926272371583774730',description:'神聖的DD'}
            ])
            .setMinValues(1)
            .setMaxValues(2)
            .setPlaceholder('幹部競選登記')
        ])

    await msg.channel.send({content:'**幹部競選登記**\n請點選以下清單(一人最多參選2種)，請選擇自己想參選的~',components:[meun]})

    }
  }