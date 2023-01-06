class dungeon{
    constructor(channelId){
        this.chaId = channelId
        this.env = require('../../serverEnv.json')
    }

    async start(userId){
        return new Promise(res=>res());
    }

    async end(userId){
        return new Promise(res=>res());
    }

}

module.exports = dungeon