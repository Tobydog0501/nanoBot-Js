const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
 
module.exports = {
    name: 'play',
    description: 'Joins and plays a video from youtube(Unavailable)',
    category:"unavailable",
    async execute(bot,message, args) {
        return;
        const voiceChannel = message.member.voice.channel;
        console.warn(voiceChannel)
        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissins');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissins');
        if (!args.length) return message.channel.send('You need to send the second argument!');
 
        const validURL = (str) =>{
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }
 
        if(validURL(args[0])){
 
            const { getVoiceConnection } = require('@discordjs/voice');

            const connection = getVoiceConnection(message.guild.id);
            const stream  = ytdl(args[0], {filter: 'audioonly'});
 
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                connection.destroy();
                message.channel.send('離開頻道');
            });
 
            await message.reply(`:thumbsup:正在播放 ***Your Link!***`)
 
            return
        }
 
        
        const { getVoiceConnection } = require('@discordjs/voice');

        const connection = getVoiceConnection(message.guild.id);
 
        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
 
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
 
        }
 
        const video = await videoFinder(args.join(' '));
 
        if(video){
            const stream  = ytdl(video.url, {filter: 'audioonly'});
            const subscription = connection.subscribe(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                connection.destroy();
            });
 
            await message.reply(`:thumbsup:正在播放 ***${video.title}***`)
        } else {
            message.channel.send('查無資料');
        }
    }
}