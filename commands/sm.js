const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const {setMoney} = require("../plugins/rpg_plugin");


module.exports = {
    name:'sm',
    category:"special",
    description:'set user\'s money',

    /**
     * 
     * @param {*} bot 
     * @param {import("discord.js").Message} msg 
     * @param {*} args 
     */
    async execute(bot,msg,args){
        if(msg.author.id!=="606668363531288577") return;
        // args[0] = userId;
        // args[1] = amount;
        if(args[0] && args[1]){
            try{
                parseInt(args[1]);
                const ui = await setMoney(args[0],args[1]);
                let ebd = new EmbedBuilder()
                    .setTitle("設定金錢數量")
                    .setColor("Random")
                    .setDescription(`成功，目前<@${args[0]}>金額總數:${ui["wallet"]} 銀行:${ui["bank"]}`)
                    .setFooter({text:`Action processed by ${msg.author.tag}`})
                    .setTimestamp()
                await msg.channel.send({embeds:[ebd]})
            }catch(e){
                await msg.channel.send(`Something went wrong.\n\`\`\`${e}\`\`\``)
            }
            
        }

    }
  }