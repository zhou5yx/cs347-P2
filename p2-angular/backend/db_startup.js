/*
 * Functions to create the database and schema
 */
var mysql = require('mysql');
module.exports = {
  connect: function() {
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'password',
      database : 'p2'
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
    conn.query('DROP TABLE IF EXISTS user', function(err, result) {
      if (err) console.log(err);
    });
    conn.query('DROP TABLE IF EXISTS course', function(err, result) {
      if (err) console.log(err);
    });
    conn.query('DROP TABLE IF EXISTS role', function(err, result) {
      if (err) console.log(err);
    });
    conn.query('CREATE TABLE IF NOT EXISTS course (id int NOT NULL AUTO_INCREMENT, name varchar(5), PRIMARY KEY (id))',
                function(err, result) {
                  if (result) {
                    conn.query("INSERT INTO course VALUES (NULL, 'CS149')");
                    conn.query("INSERT INTO course VALUES (NULL, 'CS159')");
                    conn.query("INSERT INTO course VALUES (NULL, 'CS240')");
                    conn.query("INSERT INTO course VALUES (NULL, 'CS261')");
                  } else {
                    console.log(err);
                  }
                });
    conn.query('CREATE TABLE IF NOT EXISTS user (' +
                'id int NOT NULL AUTO_INCREMENT,'
                + 'username varchar(255),'
                + 'password varchar(255),'
                + 'firstname varchar(255),'
                + 'lastname varchar(255),'
                + 'role_id int,'
                + 'PRIMARY KEY (id)'
              + ')', function(err, result) {
                if (err) console.log(err);
              });
    conn.query('CREATE TABLE IF NOT EXISTS role (' +
                'id int NOT NULL AUTO_INCREMENT,'
                + 'role_name varchar(255),'
                + 'PRIMARY KEY (id)'
              + ')', function(err, result) {
                if (err) console.log(err);
              });
  },

  addUsers: function(conn) {
    conn.query("INSERT INTO user VALUES ("
              + "NULL,"
              + "'meatballboy28',"
              + "'spaghetti',"
              + "'Nicholas',"
              + "'Meatball',"
              + "1"
              + ")", function(err, result) {
                if (err) console.log(err);
              });
    conn.query("INSERT INTO user VALUES ("
              + "NULL,"
              + "'arnoldae',"
              + "'password',"
              + "'Arnold',"
              + "'Schwarzenboy',"
              + "2"
              + ")", function(err, result) {
                if (err) console.log(err);
              });
    conn.query("INSERT INTO user VALUES ("
              + "NULL,"
              + "'happyfeet99',"
              + "'penguin',"
              + "'Catalina',"
              + "'Happyfeetpenguingirl III',"
              + "1"
              + ")", function(err, result) {
                if (err) console.log(err);
              });
    conn.query("INSERT INTO user VALUES ("
              + "NULL,"
              + "'johnnys',"
              + "'nicetomeetyou',"
              + "'Johnny',"
              + "'Jarganfargangas',"
              + "1"
              + ")", function(err, result) {
                if (err) console.log(err);
              });
  }
}
