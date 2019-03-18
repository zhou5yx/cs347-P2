var execsql = require('execsql'),
    dbConfig = {
        host: 'localhost',
        user: 'root',
        password: 'root'
    },
    sql = 'use p2;';
execsql.config(dbConfig)
    .exec(sql).execFile('./backend/sql/create.sql', (err, results) => {
        console.log(results);
    }).end();
