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

/**
INSERT INTO course VALUES (149, 'CS149');
INSERT INTO course VALUES (159, 'CS159');


INSERT INTO user VALUES (id, 'meatballboy28', 'spaghetti', 'Nicholas', 'Meatball', 1);
INSERT INTO user VALUES (id, 'arnolde', 'password', 'Arnold', 'Schwarzenboy', 2);
INSERT INTO user VALUES (id, 'johnys', 'nicetomeetyou', 'Johnny', 'Jarganfargangas', 1);
INSERT INTO user VALUES (id, 'happyfeet99', 'penguin', 'Catalina', 'Happyfeetpenguingirl III', 1);


INSERT INTO location VALUES (143, 'Linux Lab');
INSERT INTO location VALUES (250, 'Linux Lab');
INSERT INTO location VALUES (252, 'Mac Lab');


INSERT INTO role VALUES (id, 'ta');
INSERT INTO role VALUES (id, 'student');
INSERT INTO role VALUES (id, 'admin');

INSERT INTO event VALUES (id,1,'shift','2019-03-16 17:00:00','2019-03-16 19:00:00',149,250);
INSERT INTO event VALUES (id,1,'shift','2019-03-19 17:00:00','2019-03-19 19:00:00',149,250);
INSERT INTO event VALUES (id,1,'shift','2019-03-05 16:00:00','2019-03-05 23:00:00',159,250);
INSERT INTO event VALUES (id,1,'cover','2019-03-26 17:00:00','2019-03-26 19:00:00',149,250);
INSERT INTO event VALUES (id,1,'cover','2019-03-18 21:00:00','2019-03-18 23:00:00',159,250);
INSERT INTO event VALUES (id,1,'shift','2019-03-29 20:00:00','2019-03-29 23:00:00',149,250);
INSERT INTO event VALUES (id,1,'cover','2019-03-10 19:00:00','2019-03-10 23:00:00',159,250);
INSERT INTO event VALUES (id,1,'shift','2019-03-16 19:00:00','2019-03-16 21:00:00',149,250);
INSERT INTO event VALUES (id,1,'shift','2019-03-06 17:00:00','2019-03-06 19:00:00',159,250);
INSERT INTO event VALUES (id,1,'shift','2019-03-09 17:00:00','2019-03-09 19:00:00',149,250);
INSERT INTO event VALUES (id,1,'shift','2019-04-14 17:00:00','2019-04-14 19:00:00',159,250);
INSERT INTO event VALUES (id,1,'shift','2019-04-06 12:00:00','2019-04-06 23:00:00',149,250);
INSERT INTO event VALUES (id,1,'shift','2019-05-12 17:00:00','2019-05-12 19:00:00',159,250);
*/
