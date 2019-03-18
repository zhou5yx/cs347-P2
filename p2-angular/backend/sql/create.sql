DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS role;

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
