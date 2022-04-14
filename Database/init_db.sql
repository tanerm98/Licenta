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

CREATE TABLE IF NOT EXISTS workspaces (
    app_bundle_id varchar PRIMARY KEY,
    description varchar,
    repository_link varchar
);

CREATE TABLE IF NOT EXISTS jobs (
    id serial PRIMARY KEY,
    app_bundle_id varchar NOT NULL REFERENCES workspaces(app_bundle_id) ON DELETE CASCADE,
    pr_id integer DEFAULT 0,
    summary varchar
);

CREATE TABLE IF NOT EXISTS launch_data (
    id serial PRIMARY KEY,
    today_date date DEFAULT CURRENT_DATE,
    app_bundle_id varchar NOT NULL REFERENCES workspaces(app_bundle_id) ON DELETE CASCADE,
    device varchar NOT NULL,
    launch_type varchar NOT NULL,
    launch_duration real NOT NULL,
    memory_usage real NOT NULL
);

CREATE TABLE IF NOT EXISTS install_data (
    id serial PRIMARY KEY,
    today_date date DEFAULT CURRENT_DATE,
    app_bundle_id varchar NOT NULL REFERENCES workspaces(app_bundle_id) ON DELETE CASCADE,
    app_size integer NOT NULL,
    install_launch real NOT NULL,
    install_memory real NOT NULL
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

INSERT INTO workspaces (app_bundle_id, description, repository_link) VALUES ('Fitbit.Concentration', 'Simple Memory Game', 'github.com/tanerm98/Licenta');
INSERT INTO workspaces (app_bundle_id, description, repository_link) VALUES ('App.Snake', 'Classic Snake Game', 'www.abc.com');
INSERT INTO workspaces (app_bundle_id, description, repository_link) VALUES ('Game.GTA', 'GTA 5 Game', 'www.def.com');
INSERT INTO workspaces (app_bundle_id, description, repository_link) VALUES ('Tool.Reader', 'PDF Reader', 'www.ghi.com');

INSERT INTO jobs (app_bundle_id, pr_id, summary) VALUES ('Fitbit.Concentration', 0,
'Performance Metrics of Fitbit.Concentration Application Tested from this PR
---------------------------------------------------------------
> APP SIZE: 1MB  :white_check_mark:
> FIRST LAUNCH AFTER INSTALL - DURATION: 2780ms  :x:
> FIRST LAUNCH AFTER INSTALL - MEMORY USAGE: 5.5MB  :white_check_mark:
---------------------------------------------------------------
> DEVICE: iPhone 8 | LAUNCH TYPE: WARM | DURATION: 1906ms  :x: | MEMORY USAGE: 5.33MB  :white_check_mark:
----------------------------------------------------
');

INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-15', 'iPhone 8', 'COLD', 1910, 5.0);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-15', 'iPhone 8', 'WARM', 1820, 5.1);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-15', 'iPhone 11', 'COLD', 1830, 5.2);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-15', 'iPhone 11', 'WARM', 1740, 5.9);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-16', 'iPhone 8', 'COLD', 1950, 5.7);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-16', 'iPhone 8', 'WARM', 1860, 5.3);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-16', 'iPhone 11', 'COLD', 1870, 5.2);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-16', 'iPhone 11', 'WARM', 1780, 5.1);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-17', 'iPhone 8', 'COLD', 1990, 5.4);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-17', 'iPhone 8', 'WARM', 1800, 6.0);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-17', 'iPhone 11', 'COLD', 1810, 4.0);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-17', 'iPhone 11', 'WARM', 1720, 5.3);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-18', 'iPhone 8', 'COLD', 1930, 5.2);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-18', 'iPhone 8', 'WARM', 1840, 5.1);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-18', 'iPhone 11', 'COLD', 1850, 5.2);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-18', 'iPhone 11', 'WARM', 1760, 5.4);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-19', 'iPhone 8', 'COLD', 1970, 5.5);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-19', 'iPhone 8', 'WARM', 1880, 5.7);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-19', 'iPhone 11', 'COLD', 1890, 5.2);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-19', 'iPhone 11', 'WARM', 1700, 5.1);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-20', 'iPhone 8', 'COLD', 1910, 5.0);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-20', 'iPhone 8', 'WARM', 1820, 6.1);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-20', 'iPhone 11', 'COLD', 1890, 4.9);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-20', 'iPhone 11', 'WARM', 1780, 4.0);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-21', 'iPhone 8', 'COLD', 1970, 4.5);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-21', 'iPhone 8', 'WARM', 1860, 4.8);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-21', 'iPhone 11', 'COLD', 1850, 5.4);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-21', 'iPhone 11', 'WARM', 1750, 5.5);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-22', 'iPhone 8', 'COLD', 1940, 5.06);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-22', 'iPhone 8', 'WARM', 1830, 5.01);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-22', 'iPhone 11', 'COLD', 1820, 5.10);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-22', 'iPhone 11', 'WARM', 1710, 5.20);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-23', 'iPhone 8', 'COLD', 1900, 5.30);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-23', 'iPhone 8', 'WARM', 1850, 5.40);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-23', 'iPhone 11', 'COLD', 1860, 5.50);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-23', 'iPhone 11', 'WARM', 1770, 5.60);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-24', 'iPhone 8', 'COLD', 1980, 6.2);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-24', 'iPhone 8', 'WARM', 1890, 4.2);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-24', 'iPhone 11', 'COLD', 1810, 4.5);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-24', 'iPhone 11', 'WARM', 1720, 5.0);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-25', 'iPhone 8', 'COLD', 1920, 5.1);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-25', 'iPhone 8', 'WARM', 1830, 5.2);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-25', 'iPhone 11', 'COLD', 1840, 5.2);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-25', 'iPhone 11', 'WARM', 1750, 5.2);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-26', 'iPhone 8', 'COLD', 1960, 5.3);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-26', 'iPhone 8', 'WARM', 1870, 5.4);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-26', 'iPhone 11', 'COLD', 1880, 5.4);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-26', 'iPhone 11', 'WARM', 1790, 5.4);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-27', 'iPhone 8', 'COLD', 1990, 5.4);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-27', 'iPhone 8', 'WARM', 1880, 5.4);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-27', 'iPhone 11', 'COLD', 1870, 5.5);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-27', 'iPhone 11', 'WARM', 1760, 5.5);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-28', 'iPhone 8', 'COLD', 1950, 5.6);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-28', 'iPhone 8', 'WARM', 1840, 3.6);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-28', 'iPhone 11', 'COLD', 1830, 5.6);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-28', 'iPhone 11', 'WARM', 1720, 5.6);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-29', 'iPhone 8', 'COLD', 2910, 10.1);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-29', 'iPhone 8', 'WARM', 2800, 10.2);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-29', 'iPhone 11', 'COLD', 2820, 10.2);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-29', 'iPhone 11', 'WARM', 2730, 10.3);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-30', 'iPhone 8', 'COLD', 2940, 10.3);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-30', 'iPhone 8', 'WARM', 2870, 10.2);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-30', 'iPhone 11', 'COLD', 2880, 10.7);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-30', 'iPhone 11', 'WARM', 2790, 10.8);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-31', 'iPhone 8', 'COLD', 2910, 10.9);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-31', 'iPhone 8', 'WARM', 2820, 10.1);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-31', 'iPhone 11', 'COLD', 2830, 10.5);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-05-31', 'iPhone 11', 'WARM', 2705, 11.0);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-06-01', 'iPhone 8', 'COLD', 2950, 9.8);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-06-01', 'iPhone 8', 'WARM', 2860, 9.4);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-06-01', 'iPhone 11', 'COLD', 2870, 10.1);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-06-01', 'iPhone 11', 'WARM', 2790, 10.1);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-06-02', 'iPhone 8', 'COLD', 2900, 10.2);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-06-02', 'iPhone 8', 'WARM', 2810, 11.0);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-06-02', 'iPhone 11', 'COLD', 2850, 8.9);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-06-02', 'iPhone 11', 'WARM', 2760, 10.5);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-06-03', 'iPhone 8', 'COLD', 2980, 10.1);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-06-03', 'iPhone 8', 'WARM', 2810, 9.8);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-06-03', 'iPhone 11', 'COLD', 2820, 8.8);
INSERT INTO launch_data (app_bundle_id, today_date, device, launch_type, launch_duration, memory_usage) VALUES ('Fitbit.Concentration', '2021-06-03', 'iPhone 11', 'WARM', 2730, 10.0);

INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-15', 1.1, 2000, 5.5);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-16', 1.2, 2100, 4.8);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-17', 1.1, 2200, 5.0);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-18', 0.9, 2100, 4.9);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-19', 1.1, 1900, 5.2);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-20', 1, 2300, 5.4);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-21', 1.2, 2200, 5.8);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-22', 1, 2100, 5.1);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-23', 1.1, 2000, 4.5);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-24', 0.8, 2050, 5.0);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-25', 1.1, 2090, 5.2);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-26', 1, 1950, 5.3);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-27', 1.2, 2100, 5.0);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-28', 0.9, 2050, 6.0);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-29', 1.6, 3100, 10.0);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-30', 1.5, 3200, 10.1);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-05-31', 1.7, 2900, 11.0);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-06-01', 1.6, 3050, 10.8);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-06-02', 1.5, 3100, 10.4);
INSERT INTO install_data (app_bundle_id, today_date, app_size, install_launch, install_memory) VALUES ('Fitbit.Concentration', '2021-06-03', 1.7, 3005, 10.1);
