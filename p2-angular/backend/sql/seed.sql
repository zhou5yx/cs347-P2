USE p2;

INSERT INTO course VALUES (149, 'CS149', 1);
INSERT INTO course VALUES (159, 'CS159', 1);


INSERT INTO semester VALUES(id, 'Fall', 2019);
INSERT INTO semester VALUES(id, 'Spring', 2019);

/**
INSERT INTO user VALUES (id, 'arnolde', 'password', 'Arnold', 'Schwarzenboy', 2, 159, NULL);
INSERT INTO user VALUES (id, 'johnys', 'nicetomeetyou', 'Johnny', 'Jarganfargangas', 1, 149, 10);
INSERT INTO user VALUES (id, 'happyfeet99', 'penguin', 'Catalina', 'Happyfeetpenguingirl III', 1, 159, 15);
**/

INSERT INTO role VALUES (id, 'ta');
INSERT INTO role VALUES (id, 'student');
INSERT INTO role VALUES (id, 'admin');


INSERT INTO location VALUES (143, 'Linux Lab');
INSERT INTO location VALUES (250, 'Linux Lab');
INSERT INTO location VALUES (252, 'Mac Lab');


INSERT INTO event VALUES (id, 3, NULL,NULL, 'shift','2019-04-16 17:00:00','2019-03-16 19:00:00',149,250);
INSERT INTO event VALUES (id, 3, NULL,NULL, 'shift','2019-04-19 17:00:00','2019-03-19 19:00:00',149,250);
INSERT INTO event VALUES (id, 1, NULL,NULL, 'shift','2019-04-05 16:00:00','2019-03-05 23:00:00',159,250);
INSERT INTO event VALUES (id, 1, 4,NULL, 'cover','2019-04-26 17:00:00','2019-03-26 19:00:00',159,250);
INSERT INTO event VALUES (id, 1, 4, NULL, 'cover','2019-04-18 21:00:00','2019-03-18 23:00:00',159,250);
INSERT INTO event VALUES (id, 1, NULL, NULL, 'shift','2019-04-29 20:00:00','2019-03-29 23:00:00',159,250);
INSERT INTO event VALUES (id, 1, 4, NULL, 'cover','2019-04-10 19:00:00','2019-03-10 23:00:00',159,250);
INSERT INTO event VALUES (id, 3, NULL, NULL, 'shift','2019-04-16 19:00:00','2019-03-16 21:00:00',149,250);
INSERT INTO event VALUES (id, 1, NULL, NULL, 'shift','2019-04-06 17:00:00','2019-03-06 19:00:00',159,250);
INSERT INTO event VALUES (id, 3, NULL, NULL, 'shift','2019-04-09 17:00:00','2019-03-09 19:00:00',149,250);
INSERT INTO event VALUES (id, 1, NULL, NULL, 'shift','2019-04-14 17:00:00','2019-04-14 19:00:00',159,250);
INSERT INTO event VALUES (id, 3, NULL, NULL, 'shift','2019-04-06 12:00:00','2019-04-06 23:00:00',149,250);
INSERT INTO event VALUES (id, 1, NULL, NULL, 'shift','2019-04-12 17:00:00','2019-05-12 19:00:00',159,250);

INSERT INTO monhr VALUES(id, 1, "January", 30);
INSERT INTO monhr VALUES(id, 1, "February", 25);
INSERT INTO monhr VALUES(id, 1, "March", 38);
INSERT INTO monhr VALUES(id, 3, "January", 35);
INSERT INTO monhr VALUES(id, 3, "February", 20);
INSERT INTO monhr VALUES(id, 3, "March", 30);
INSERT INTO monhr VALUES(id, 4, "January", 15);
INSERT INTO monhr VALUES(id, 4, "February", 28);
INSERT INTO monhr VALUES(id, 4, "March", 25);

/**INSERT INTO event VALUES (id, 4, 1, NULL, 'shift','2019-04-10 19:00:00','2019-03-10 23:00:00',159,250);
INSERT INTO event VALUES (id, 4, 1, NULL, 'shift','2019-04-18 21:00:00','2019-03-18 23:00:00',159,250);
INSERT INTO event VALUES (id, 4, 1,NULL, 'shift','2019-04-26 17:00:00','2019-03-26 19:00:00',159,250);
**/
UPDATE event SET requester=user_id WHERE type = 'shift';

INSERT INTO session VALUES(id, 'test','2019-03-16 17:00:00', '2019-03-16 19:00:00', 159);

INSERT INTO session_users VALUES(id,1,1);

INSERT INTO session_questions VALUES(id, 1, 1, 1);

INSERT INTO question VALUES(id,1,1,'HELP ME', 'EVERYTHING IS ON FIRE',NULL,NULL,'Unresolved', 0,now());

INSERT INTO announcement VALUES(id,1,'LISTEN','EVERYTHING IS NOT OKAY', 1);
