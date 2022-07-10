module.exports = {
    name:"userInfo",
    category:"test",
    description:"取得使用者資訊",
    aliases:['ui','user'],
    async execute(bot,msg,args,Discord){
      if(!!args[0]){
        //author ui
      }else if(args[0].length==18){
        //searching
      }else{
        //not snowflake
      }
    }
  }