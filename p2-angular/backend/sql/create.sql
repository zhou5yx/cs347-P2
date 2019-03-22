USE p2;

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS event;


CREATE TABLE IF NOT EXISTS course (
  id int NOT NULL,
  name varchar(5),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(255),
  password varchar(255),
  firstname varchar(255),
  lastname varchar(255),
  role_id int,
  course_id int,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS role (
  id int NOT NULL AUTO_INCREMENT,
  role_name varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS location (
  id int NOT NULL,
  name varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS event (
  id int NOT NULL AUTO_INCREMENT,
  user_id int,
  type varchar(10),
  start_date datetime,
  end_date datetime,
  course_id int,
  location int,
  PRIMARY KEY (id)
);
