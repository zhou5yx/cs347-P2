/*
 * Functions to create the database and schema
 */
var mysql = require('mysql');
const cp = require('child_process');

module.exports = {
  connect: function() {
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'password',
      database : 'p2',
      multipleStatements: true
    });

    connection.connect(function(err) {
        if (err) console.log(err);
        else {
          // create tables, add data to db
          console.log("Connected to db!");
        }
    });

    return connection;
  },


  create: function(conn) {
    cp.exec('mysql --user=root --password=password < ./backend/sql/create.sql', (error, stdout, stderr) => {
            if (error) throw error;
            else {
              this.seedDB(conn);
            }
    });
  },

  seedDB: function(conn) {
    cp.exec('mysql --user=root --password=password < ./backend/sql/seed.sql', (error, stdout, stderr) => {
            if (error) throw error;
    });
  }
}
