const plu = require('../rpg_plugin')


module.exports = {
    name:'top',
    category:"rpg",
    description:"檢視使用者等級排行",
    async execute(bot,msg,args,Discord){
        if(args==undefined||typeof (praseInt(args[0])!=NaN)){
            await plu.tops((args==undefined||args[0]==0)?1:args[0])
                .then(async lists=>{
                    var index = (((args==undefined||args[0]==0)?1:args[0])-1)*10+1;

                })
        }else{
            await plu.tops(null,args[0])
                .then()
                .catch()
        }
    }
}