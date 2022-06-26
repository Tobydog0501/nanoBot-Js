module.exports = {
    name: 'leave',
    description: 'stop the bot and leave the channel(Unavailable)',
    category:"unavailable",
    async execute(bot,message, args) {
        return;
        const voiceChannel = message.member.voice.channel;
 
        if(!voiceChannel) return message.channel.send("你需要在語音頻道中才可停止撥放音樂!");
        await voiceChannel.leave();
        await message.channel.send('離開頻道 :smiling_face_with_tear:')
 
    }
}