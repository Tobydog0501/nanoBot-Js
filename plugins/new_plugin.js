const database = require('better-sqlite3');

class plugin{
  constructor(){
    /**
     * @type {Database}
     */
    this.db = new database.Database('./data.db', (err) => {
        if (err)
        console.error(err.message);

        console.log('Connected to the data database.');
    });

    this.db.run('CREATE TABLE IF NOT EXISTS users (\
       id TEXT PRIMARY KEY, \
       level INT DEFAULT 0,\
       exp INT DEFAULT 0,\
       totalExp INT DEFAULT 0,\
       toNext INT DEFAULT 80,\
       bank INT DEFAULT 0,\
       wallet INT DEFAULT 0,\
       report BOOL DEFAULT 0,\
       joinUGS BOOL DEFAULT 0,\
       lastMsg DATETIME DEFAULT datetime(\'now\',\'-1 day\')\
       login DATETIME DEFAULT datetime(\'now\',\'-1 day\'),\
       work DATETIME DEFAULT datetime(\'now\',\'-1 day\')\
    );');
  }
  
  /**
   * 
   * @param {string} userId The user's id, must be a snowflake
   */
  async newMember(userId){
    this.db.run(`INSERT OR IGNORE INTO users (id) VALUES (${userId})`);
    return new Promise((res,rej)=>{
      res("finished");
    })
  }

  closeDatabase(){
    this.db.close();
  }

  /**
   * 
   * @param {string} userId 
   */
  async rank(userId){
    await this.newMember(userId);
    this.db.get(`SELECT exp FROM users WHERE id==${userId};`,(err,rows)=>{
      if(err) throw err;
      const ret = {
        "lv":rows.level,
        "exp":rows.exp
      }
    })
    closeDatabase();
  }
  
}

module.exports = plugin;