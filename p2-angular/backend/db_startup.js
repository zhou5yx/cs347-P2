/*
 * Functions to create the database and schema
 */
module.exports = {
  create: function(conn) {
    conn.query('DROP TABLE IF EXISTS user', function(err, result) {
      if (err) console.log(err);
      if (result) console.log(result);
    });
    conn.query('DROP TABLE IF EXISTS course', function(err, result) {
      if (err) console.log(err);
      if (result) console.log(result);
    });
    conn.query('CREATE TABLE IF NOT EXISTS course (id int primary key, name varchar(5))',
                function(err, result) {
                  if (result) {
                    conn.query("INSERT INTO course VALUES (1, 'CS149')");
                    conn.query("INSERT INTO course VALUES (2, 'CS159')");
                    conn.query("INSERT INTO course VALUES (3, 'CS240')");
                    conn.query("INSERT INTO course VALUES (4, 'CS261')");
                  } else {
                    console.log(err);
                  }
                });
    conn.query('CREATE TABLE IF NOT EXISTS user (' +
                'id int primary key auto_increment,'
                + 'username varchar(255),'
                + 'password varchar(255),'
                + 'firstname varchar(255),'
                + 'lastname varchar(255),'
                + 'role_id int'
              + ')', function(err, result) {
                if (err) console.log(err);
                if (result) console.log(result);
              });
  }
}
