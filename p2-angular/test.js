

const cp = require('child_process');
const bcrypt = require('bcryptjs');
cp.exec('mysql --user=root --password=password < ./backend/sql/create.sql', (error, stdout, stderr) => {
        if (error) throw error;
});

bcrypt.hash('password', 10).then(hash => {
  console.log(hash);
  bcrypt.compare(hash, 'password')
  .then(same => console.log(same));
});
