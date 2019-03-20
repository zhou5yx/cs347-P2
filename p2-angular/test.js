

const cp = require('child_process');

cp.exec('mysql --user=root --password=password < use p2 < ./backend/sql/create.sql', (error, stdout, stderr) => {
         (error) throw error;
        console.log(`stdout: ${}`);
});
