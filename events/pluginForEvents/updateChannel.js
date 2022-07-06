module.exports = async(guild)=>{
    let ms = await guild.members.fetch();
    let nonBots = ms.reduce((acc, mem )=>{
        return mem.user.bot ? acc : acc+1;
    },0)
    await guild.channels.fetch('926261166219608084')
        .then(async chn=>{
            await chn.edit({name:`┃📊ᐢ・一切的一切: ${guild.memberCount}`})
        });
    console.log(guild.memberCount);
    await guild.channels.fetch('926261169520508948')
        .then(async chn=>{
            await chn.edit({name:`┃📊ᐢ・人類防衛隊: ${nonBots}`})
        });
        console.log(nonBots);
    await guild.channels.fetch('926261952706125834')
        .then(async chn=>{
            await chn.edit({name:`┃📊ᐢ・人民登記處: ${await guild.roles.fetch('926252511201988678').then(r=>r.members.size)}`})
        });
        console.log(await guild.roles.fetch('926252511201988678').then(r=>r.members.size));
    await guild.channels.fetch('926262563480666163')
        .then(async chn=>{
            await chn.edit({name:`┃📊ᐢ・駕照持有數: ${await guild.roles.fetch('926262190619643925').then(r=>r.members.size)}`})
        });
        console.log(await guild.roles.fetch('926262190619643925').then(r=>r.members.size));
    await guild.channels.fetch('926262499718889513')
        .then(async chn=>{
            await chn.edit({name:`┃📊ᐢ・車票銷售量: ${await guild.roles.fetch('926262352838529055').then(r=>r.members.size)}`})
        });
        console.log(await guild.roles.fetch('926262352838529055').then(r=>r.members.size));
    await guild.channels.fetch('926261173110833162')
        .then(async chn=>{
            await chn.edit({name:`┃📊ᐢ・機器人軍團: ${guild.memberCount-nonBots}`})
        });
        console.log(guild.memberCount-nonBots);
    return new Promise(res=>res())
}