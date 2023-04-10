const fs = require('fs');

/**
 * 
 */

class file_edit{

    /**
     * 
     * @param {string} fileName The specific file, default is "env.json"
     * @param {string} backupFile The file to store backed up data, default is "backup.json".
     */
    constructor(fileName="./env.json",backupFile="./backup.json"){
        this.file = fileName;
        this.backupFile = backupFile;
        /**
         * @type {object}
         */
        this.data = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    }

    /**
     * Repairs the data.
     * @returns {Promise<void>}
     */

    async repair(){
        try{
            let data = JSON.parse(fs.readFileSync(this.backupFile, 'utf-8'));
            let dictstring = JSON.stringify(data);
            return new Promise((res)=>{
                fs.writeFileSync(this.file, dictstring);
                res();
            })
        }catch{
            return new Promise((res,rej)=>{
                rej();
            })
        }
        
    }

    /**
     * Backs up the data.
     * @returns {Promise<void>}
     */

    async backup(){
        try{
            let data = JSON.parse(fs.readFileSync(this.file, 'utf-8'));
            let dictstring = JSON.stringify(data);
            return new Promise((res)=>{
                fs.writeFileSync(this.backupFile, dictstring);
                res();
            })
        }catch{
            return new Promise((res,rej)=>{
                rej();
            })
        }
    }

    /**
     * 
     * @param {object} data 
     * @returns 
     */

    async write(data){
        try{await this.backup()}catch{await this.repair()}  // Try to backup the files
        let dictstring = JSON.stringify(data);
        return new Promise((res)=>{
            fs.writeFileSync(this.file, dictstring);
            res();
        })
    }


}

module.exports = file_edit