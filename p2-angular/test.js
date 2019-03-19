/**var execsql = require('execsql'),
    dbConfig = {
        host: 'localhost',
        user: 'root',
        password: 'password'
    },
    sql = 'use p2;',
    sqlFile = './backend/sql/create.sql';

execsql.config(dbConfig)
    .exec(sql, function(err,results){
      console.log(err);
    })
    .execFile(sqlFile, function(err, results){
        console.log(err);
        console.log(results);
    }).end;**/

const cp = require('child_process');

cp.exec('mysql --user=root --password=password < use p2 < ./backend/sql/create.sql', (error, stdout, stderr) => {
         (error) throw error;
        console.log(`stdout: ${}`);
});
