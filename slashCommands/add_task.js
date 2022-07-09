const { SlashCommandBuilder } = require('@discordjs/builders');
const fsPromise = require('fs/promises');
const fs = require('fs');

module.exports = {
    data:new SlashCommandBuilder()
	    .setName('add_task')
	    .setDescription('新增任務')
        .addStringOption(option =>
            option.setName('任務名稱')
                .setDescription('任務名稱')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('任務型態')
                .setDescription('任務型態')
                .setRequired(true)
                .addChoices(
                    {name:'傳送訊息',value:'SEND_MESSAGE'},
                    {name:'傳送照片',value:'SEND_PICTURE'},
                    
                ))
        .addStringOption(option =>
            option.setName('數量')
                .setDescription('數量')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('任務難度')
                .setDescription('任務難度')
                .setRequired(true)
                .addChoices(
                    {name:'簡單',value:'EASY'},
                    {name:'普通',value:'NORMAL'},
                    {name:'困難',value:'HARD'},
                    {name:'瘋狂',value:'CRAZY'},
                    {name:'不可能的任務',value:'IMPOSSIBLE'},
                    
                ))
        .addStringOption(option =>
            option.setName('經驗加倍')
                .setDescription('x幾倍')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('任務地點')
                .setDescription('頻道ID')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('任務特殊需求')
                .setDescription('include or something else')
                .setRequired(false))
                
     
    ,
    async execute(inter,Discord){
        if(inter.member.id!=='606668363531288577'&&inter.member.id!=='939843138242105384'){
            return
        }
        let list = ['name','type','channel','amount','difficulty','amplifier','specialRequire']
        let newTask = {
            "name":inter.options.get('任務名稱').value,
            "type":inter.options.get('任務型態').value,
            "channel":inter.options.get('任務地點').value?inter.options.get('任務地點').value:null,
            "amount":inter.options.get('數量').value,
            "difficulty":inter.options.get('任務難度').value,
            "amplifier":inter.options.get('經驗加倍').value,
            "specialRequire":inter.options.get('任務特殊需求').value?inter.options.get('任務特殊需求').value:null
        }
        let data = JSON.parse(fs.readFileSync('./tasks.json', 'utf-8'))
        if(data['tasks'].some(v=>v['name']==inter.options.get('任務名稱').value)){
            await inter.reply(`已經有名為${inter.options.get('任務名稱').value}的任務了`);
            return;
        }
        data['tasks'].push(newTask)
        var dictstring = JSON.stringify(data);
        await fsPromise.writeFile("./tasks.json", dictstring);
        var field = [];
        for(var i in newTask){
            field.push({name:i,value:newTask[i],inline:true});
        }
        let embed = new Discord.MessageEmbed()
            .setTitle(`新增任務成功`)
            .setDescription(`已新增任務，詳細如下`)
            .setFields(field)
            .setColor('RANDOM')
        await inter.reply({embeds:[embed]})
    }
}
