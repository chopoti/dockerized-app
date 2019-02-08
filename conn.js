
let db = require('knex') ({
 
    client: 'mysql',
      connection: {
        host:'127.0.0.1',
        user: 'chops',
        password: 'P@ssw0rd',
        database: 'names'
    },
    pool: { min: 0, max: 5 }
   
});

module.exports = {
    db
};
