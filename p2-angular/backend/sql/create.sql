USE p2;

DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS semester;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS session;
DROP TABLE IF EXISTS session_users;
DROP TABLE IF EXISTS session_questions;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS announcement;
DROP TABLE IF EXISTS monhr;
DROP TABLE IF EXISTS avail;

CREATE TABLE IF NOT EXISTS course (
  id int NOT NULL,
  name varchar(5),
  semester_id int,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS semester (
  id int NOT NULL AUTO_INCREMENT,
  season varchar(10),
  year int,
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

CREATE TABLE IF NOT EXISTS avail (
  id int NOT NULL AUTO_INCREMENT,
  user_id int,
  mon_start int,
  mon_end int,
  tues_start int,
  tues_end int,
  wed_start int,
  wed_end int,
  thurs_start int,
  thurs_end int,
  fri_start int,
  fri_end int,
  sun_start int,
  sun_end int,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS monhr (
  id int NOT NULL AUTO_INCREMENT,
  user_id int,
  month varchar(225),
  hr int,
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
  requester int,
  requestee int,
  type varchar(10),
  start_date datetime,
  end_date datetime,
  course_id int,
  location int,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS session (
  id int NOT NULL AUTO_INCREMENT,
  code varchar(255),
  start_date datetime,
  end_date datetime,
  course_id int,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS session_users (
  id int NOT NULL AUTO_INCREMENT,
  session_id int,
  user_id int,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS session_questions (
  id int NOT NULL AUTO_INCREMENT,
  user_id int,
  session_id int,
  question_id int,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS question (
  id int NOT NULL AUTO_INCREMENT,
  session_id int,
  user_id int,
  title varchar(255),
  description varchar(1000),
  ta_answer varchar(1000),
  student_answer varchar(1000),
  status varchar(20),
  votes int,
  mytimestamp datetime,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS announcement (
  id int NOT NULL AUTO_INCREMENT,
  session_id int,
  title varchar(255),
  description varchar(1000),
  user_id int,
  PRIMARY KEY (id)
);
