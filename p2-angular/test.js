

const cp = require('child_process');

cp.exec('mysql --user=root --password=password < ./backend/sql/create.sql', (error, stdout, stderr) => {
        if (error) throw error;
});
