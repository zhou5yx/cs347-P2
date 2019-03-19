DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS test;


CREATE TABLE IF NOT EXISTS course (id int NOT NULL AUTO_INCREMENT, name varchar(5), PRIMARY KEY (id));
CREATE TABLE IF NOT EXISTS user (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(255),
  password varchar(255),
  firstname varchar(255),
  lastname varchar(255),
  role_id int,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS role (
  id int NOT NULL AUTO_INCREMENT,
  role_name varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS test (
   id int NOT NULL AUTO_INCREMENT,
   PRIMARY KEY(id)
);

INSERT INTO test VALUES ('1');
SELECT id from test;
