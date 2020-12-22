# Senior Project, Spring 2020
# Isaac Prost
# Personal Assistant/ Event scheduling hub

DROP DATABASE IF EXISTS S20caebo;

CREATE DATABASE  S20caebo;

USE S20caebo;

CREATE TABLE user(
  user_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  username VARCHAR(50),
  email VARCHAR(50),
  pass VARBINARY(1024),
  group_id INT,
  group_admin BOOLEAN,
  PRIMARY KEY(user_id)
);

CREATE TABLE groups(
  group_id INT NOT NULL AUTO_INCREMENT,
  group_name VARCHAR(50),
  PRIMARY KEY(group_id)
);

CREATE TABLE events(
  event_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(50),
  e_description VARCHAR(2048),
  e_time_start TIME,
  e_time_end TIME,
  e_date DATE,
  PRIMARY KEY(event_id)
);

CREATE TABLE user_events(
  user_event_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  event_id INT NOT NULL,

  PRIMARY KEY (user_event_id),
  FOREIGN KEY (user_id) REFERENCES `user` (user_id),
  FOREIGN KEY (event_id) REFERENCES `events` (event_id)
);

INSERT INTO groups(group_name)
VALUES("None");

INSERT INTO groups(group_name)
VALUES("America Corporate");

INSERT INTO groups(group_name)
VALUES("World Wide Technologies");

INSERT INTO user(username, first_name, last_name, email, pass, group_id, group_admin)
VALUES("iprost", "Isaac", "Prost", "isaac@email.com", SHA2("pass", 512), 2, True);

INSERT INTO user(username, first_name, last_name, email, pass, group_id, group_admin)
VALUES("gmoney", "Greg", "Money", "gmoney@email.com", SHA2("pass", 512), 2, False);

INSERT INTO user(username, first_name, last_name, email, pass, group_id, group_admin)
VALUES("kgraber", "Kyle", "Graber", "kyle@email.com", SHA2("pass", 512), 2, False);

INSERT INTO user(username, first_name, last_name, email, pass, group_id, group_admin)
VALUES("sshcwarz", "Steffen", "Shcwarz", "steffen@email.com", SHA2("pass", 512), 3, True);

INSERT INTO user(username, first_name, last_name, email, pass, group_id, group_admin)
VALUES("aadams", "Aaron", "Adams", "aaron@email.com", SHA2("pass", 512), 3, False);

INSERT INTO events(title, e_description, e_time_start, e_time_end ,e_date)
VALUES("Brunch with Employees", "It's just a brunch.", "12:00", "13:00", "2020-04-07");

INSERT INTO events(title, e_description, e_time_start, e_time_end, e_date)
VALUES("Dinner with Karen", "Don't ask for the manager Karen", "18:00", "19:00", "2020-04-12");

INSERT INTO user_events(user_id, event_id)
VALUES(1, 1);

INSERT INTO user_events(user_id, event_id)
VALUES(2, 1);

INSERT INTO user_events(user_id, event_id)
VALUES(3, 2);