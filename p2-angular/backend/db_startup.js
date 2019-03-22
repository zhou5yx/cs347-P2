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
    conn.query('DROP TABLE IF EXISTS location', function(err, result) {
      if (err) console.log(err);
    });
    conn.query('DROP TABLE IF EXISTS event', function(err, result) {
      if (err) console.log(err);
    });
    conn.query('CREATE TABLE IF NOT EXISTS course (id int NOT NULL, name varchar(5), PRIMARY KEY (id))',
      function(err, result) {
        if (result) {
          conn.query("INSERT INTO course VALUES (149, 'CS149')");
          conn.query("INSERT INTO course VALUES (159, 'CS159')");
          conn.query("INSERT INTO course VALUES (240, 'CS240')");
          conn.query("INSERT INTO course VALUES (261, 'CS261')");
        } else {
          console.log(err);
        }
      }
    );
    conn.query('CREATE TABLE IF NOT EXISTS location (id int NOT NULL, name varchar(255), PRIMARY KEY (id))',
      function(err, result) {
        if (result) {
          conn.query("INSERT INTO location VALUES (143, 'Linux Lab')");
          conn.query("INSERT INTO location VALUES (250, 'Linux Lab')");
          conn.query("INSERT INTO location VALUES (252, 'Mac Lab')");
        } else {
          console.log(err);
        }
      }
    );
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
      }
    );
    conn.query('CREATE TABLE IF NOT EXISTS role (' +
      'id int NOT NULL AUTO_INCREMENT,'
      + 'role_name varchar(10),'
      + 'PRIMARY KEY (id)'
      + ')', function(err, result) {
        if (err) console.log(err);
        else {
          conn.query("INSERT INTO role VALUES (NULL, 'ta')");
          conn.query("INSERT INTO role VALUES (NULL, 'student')");
          conn.query("INSERT INTO role VALUES (NULL, 'admin')");
        }
      }
    );
    conn.query('CREATE TABLE IF NOT EXISTS event ('
      + 'id int NOT NULL AUTO_INCREMENT,'
      + 'user_id int,'
      + 'type varchar(10),'
      + 'start_date datetime,'
      + 'end_date datetime,'
      + 'course_id int,'
      + 'location int,'
      + 'PRIMARY KEY (id)'
      + ')', function(err, result) {
        if (err) console.log(err);
      }
    );
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
      }
    );
    conn.query("INSERT INTO user VALUES ("
      + "NULL,"
      + "'arnoldae',"
      + "'password',"
      + "'Arnold',"
      + "'Schwarzenboy',"
      + "2"
      + ")", function(err, result) {
        if (err) console.log(err);
      }
    );
    conn.query("INSERT INTO user VALUES ("
      + "NULL,"
      + "'happyfeet99',"
      + "'penguin',"
      + "'Catalina',"
      + "'Happyfeetpenguingirl III',"
      + "1"
      + ")", function(err, result) {
        if (err) console.log(err);
      }
    );
    conn.query("INSERT INTO user VALUES ("
      + "NULL,"
      + "'johnnys',"
      + "'nicetomeetyou',"
      + "'Johnny',"
      + "'Jarganfargangas',"
      + "1"
      + ")", function(err, result) {
        if (err) console.log(err);
      }
    );
  },

  addEvents: function(conn) {
    conn.query("INSERT INTO event VALUES ("
      + "NULL,"
      + "1,"
      + "'shift',"
      + "'2019-03-16 17:00:00',"
      + "'2019-03-16 19:00:00',"
      + "149,"
      + "250"
      + ")", function(err, result) {
        if (err) console.log(err);
      }
    );
    conn.query("INSERT INTO event VALUES ("
      + "NULL,"
      + "1,"
      + "'shift',"
      + "'2019-03-19 17:00:00',"
      + "'2019-03-19 19:00:00',"
      + "149,"
      + "250"
      + ")", function(err, result) {
        if (err) console.log(err);
      }
    );
    conn.query("INSERT INTO event VALUES ("
      + "NULL,"
      + "1,"
      + "'shift',"
      + "'2019-03-05 16:00:00',"
      + "'2019-03-05 23:00:00',"
      + "159,"
      + "250"
      + ")", function(err, result) {
        if (err) console.log(err);
      }
    );
    conn.query("INSERT INTO event VALUES ("
      + "NULL,"
      + "1,"
      + "'cover',"
      + "'2019-03-26 17:00:00',"
      + "'2019-03-26 19:00:00',"
      + "149,"
      + "250"
      + ")", function(err, result) {
        if (err) console.log(err);
      }
    );
    conn.query("INSERT INTO event VALUES ("
      + "NULL,"
      + "1,"
      + "'cover',"
      + "'2019-03-18 21:00:00',"
      + "'2019-03-18 23:00:00',"
      + "159,"
      + "250"
      + ")", function(err, result) {
        if (err) console.log(err);
      }
    );
    conn.query("INSERT INTO event VALUES ("
      + "NULL,"
      + "1,"
      + "'shift',"
      + "'2019-03-29 20:00:00',"
      + "'2019-03-29 23:00:00',"
      + "149,"
      + "250"
      + ")", function(err, result) {
        if (err) console.log(err);
      }
    );
    conn.query("INSERT INTO event VALUES ("
      + "NULL,"
      + "1,"
      + "'cover',"
      + "'2019-03-10 19:00:00',"
      + "'2019-03-10 23:00:00',"
      + "159,"
      + "250"
      + ")", function(err, result) {
        if (err) console.log(err);
      }
    );
    conn.query("INSERT INTO event VALUES ("
      + "NULL,"
      + "1,"
      + "'shift',"
      + "'2019-03-16 19:00:00',"
      + "'2019-03-16 21:00:00',"
      + "149,"
      + "250"
      + ")", function(err, result) {
        if (err) console.log(err);
      }
    );
    conn.query("INSERT INTO event VALUES ("
      + "NULL,"
      + "1,"
      + "'shift',"
      + "'2019-03-06 17:00:00',"
      + "'2019-03-06 19:00:00',"
      + "159,"
      + "250"
      + ")", function(err, result) {
        if (err) console.log(err);
      }
    );
    conn.query("INSERT INTO event VALUES ("
      + "NULL,"
      + "1,"
      + "'shift',"
      + "'2019-03-09 17:00:00',"
      + "'2019-03-09 19:00:00',"
      + "149,"
      + "250"
      + ")", function(err, result) {
        if (err) console.log(err);
      }
    );
    conn.query("INSERT INTO event VALUES ("
      + "NULL,"
      + "1,"
      + "'shift',"
      + "'2019-04-14 17:00:00',"
      + "'2019-04-14 19:00:00',"
      + "159,"
      + "250"
      + ")", function(err, result) {
        if (err) console.log(err);
      }
    );
    conn.query("INSERT INTO event VALUES ("
      + "NULL,"
      + "1,"
      + "'shift',"
      + "'2019-04-06 12:00:00',"
      + "'2019-04-06 23:00:00',"
      + "149,"
      + "250"
      + ")", function(err, result) {
        if (err) console.log(err);
      }
    );
    conn.query("INSERT INTO event VALUES ("
      + "NULL,"
      + "1,"
      + "'shift',"
      + "'2019-05-12 17:00:00',"
      + "'2019-05-12 19:00:00',"
      + "159,"
      + "250"
      + ")", function(err, result) {
        if (err) console.log(err);
      }
    );
  }
}
