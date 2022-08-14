class adventure{
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

    async selectMode(userId){
        return new Promise(res=>res());
    }

    async loot(userId){
        return new Promise(res=>res());
    }

    async backpack(userId){
        return new Promise(res=>res());
    }

    async damage(target,damageAmount){
        return new Promise(res=>res());
    }
}


module.exports = adventure