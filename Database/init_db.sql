CREATE TABLE IF NOT EXISTS roles (
    id serial PRIMARY KEY,
    value varchar NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    username varchar NOT NULL UNIQUE,
    password varchar NOT NULL,
    role_id integer REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS user_metrics (
    today_date date DEFAULT CURRENT_DATE PRIMARY KEY,
    registers integer DEFAULT 0,
    logins integer DEFAULT 0,
    jobs integer DEFAULT 0
);

INSERT INTO roles (value) VALUES ('ADMIN');
INSERT INTO roles (value) VALUES ('MANAGER');
INSERT INTO roles (value) VALUES ('USER');

INSERT INTO users (username, password, role_id) VALUES ('admin', '$2y$10$BLMZFAnCPXX0cVRmdPP3Meu3NR/xWucAyQ4aAW2z57RlLdLPvH0Hi', 1);
INSERT INTO users (username, password, role_id) VALUES ('Taner', '$2a$10$GOiWGnJcxm3BRqEOKo7Hpeg9TzT8.OQHb173q9xQaKQFHibjM27ZK', 2);
INSERT INTO users (username, password, role_id) VALUES ('Corina', '$2a$10$C9eMXpNg00RfBbjbNHAhDOT4iiFZavZX7x9pwjrF0F6gfXNkPX6Ge', 2);
INSERT INTO users (username, password, role_id) VALUES ('Teodor', '$2a$10$K/iDjdPoDyr986LIBZmld.OOdVYMHA2zq4AxsstUXOevSYZSTuDl.', 2);
INSERT INTO users (username, password, role_id) VALUES ('Guest', '$2a$10$3Wju907cCAcewID7wG35N.uFBJAsIDERsZCR6H/Q5kXbcVv0sMT/m', 3);

INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-15', 1, 1, 1);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-16', 2, 1, 2);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-17', 3, 2, 3);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-18', 4, 2, 4);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-19', 5, 3, 3);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-20', 4, 4, 2);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-21', 3, 8, 1);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-22', 2, 9, 9);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-23', 6, 0, 10);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-24', 7, 2, 4);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-25', 0, 5, 3);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-26', 7, 11, 2);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-27', 8, 19, 11);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-28', 9, 10, 12);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-29', 10, 4, 13);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-30', 7, 3, 8);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-05-31', 12, 13, 19);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-06-01', 19, 10, 4);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-06-02', 22, 8, 8);
INSERT INTO user_metrics (today_date, registers, logins, jobs) VALUES ('2021-06-03', 5, 9, 10);