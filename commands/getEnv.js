module.exports = {
    name:"getEnv",
    description:"測試用啦",
    category:"test",
    async execute(bot,msg,args,Discord){
        return
        const ui = require('../env.json');
        console.log(ui)
    }
}