const { SlashCommandBuilder } = require('@discordjs/builders');

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
        
    }
}
