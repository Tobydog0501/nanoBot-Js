module.exports = async(guild)=>{
    let ms = await guild.members.fetch();
    let nonBots = ms.reduce((acc, mem )=>{
        return mem.user.bot ? acc : acc+1;
    },0)
    await guild.channels.fetch('926261166219608084')
        .then(async chn=>{
            await chn.edit({name:`โ๐แขใปไธๅ็ไธๅ: ${guild.memberCount}`})
        });
    await guild.channels.fetch('926261169520508948')
        .then(async chn=>{
            await chn.edit({name:`โ๐แขใปไบบ้ก้ฒ่ก้: ${nonBots}`})
        });
    await guild.channels.fetch('926261952706125834')
        .then(async chn=>{
            await chn.edit({name:`โ๐แขใปไบบๆฐ็ป่จ่: ${await guild.roles.fetch('926252511201988678').then(r=>r.members.size)}`})
        });
    await guild.channels.fetch('926262563480666163')
        .then(async chn=>{
            await chn.edit({name:`โ๐แขใป้ง็งๆๆๆธ: ${await guild.roles.fetch('926262190619643925').then(r=>r.members.size)}`})
        });
    await guild.channels.fetch('926262499718889513')
        .then(async chn=>{
            await chn.edit({name:`โ๐แขใป่ป็ฅจ้ทๅฎ้: ${await guild.roles.fetch('926262352838529055').then(r=>r.members.size)}`})
        });
    await guild.channels.fetch('926261173110833162')
        .then(async chn=>{
            await chn.edit({name:`โ๐แขใปๆฉๅจไบบ่ปๅ: ${guild.memberCount-nonBots}`})
        });
        console.log([guild.memberCount,nonBots,await guild.roles.fetch('926252511201988678').then(r=>r.members.size),await guild.roles.fetch('926262190619643925').then(r=>r.members.size),await guild.roles.fetch('926262352838529055').then(r=>r.members.size),guild.memberCount-nonBots]);
    return new Promise(res=>res())
}