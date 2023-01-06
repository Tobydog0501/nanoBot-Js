const fsPromise = require('fs/promises');
const fs = require('fs');


module.exports = async()=>{
    try{    //backup
        let data = JSON.parse(fs.readFileSync('./env.json', 'utf-8'))
        var dictstring = JSON.stringify(data);
        await fsPromise.writeFile("./backup.json", dictstring);
        return new Promise(res=>res());
      }catch(e){   //repair
        let data = JSON.parse(fs.readFileSync('./backup.json', 'utf-8'))
        var dictstring = JSON.stringify(data);
        await fsPromise.writeFile("./env.json", dictstring);
        console.error(e)
        return new Promise(res=>res());
      }
}