

const cp = require('child_process');

cp.exec('mysql --user=root --password=password < use p2 < ./backend/sql/create.sql', (error, stdout, stderr) => {
        if (error) throw error;
});
