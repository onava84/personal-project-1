DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tournaments; 
DROP TABLE IF EXISTS teams; 
DROP TABLE IF EXISTS matches; 



CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(100) NOT NULL,
password VARCHAR(200) NOT NULL,
email VARCHAR(100) NOT NULL,
first_name VARCHAR(100),
last_name VARCHAR(100)
);

CREATE TABLE tournaments (
tournament_id SERIAL PRIMARY KEY,
tournament_name VARCHAR(100),
user_id INTEGER REFERENCES users(id),
teams_number INT NOT NULL 
)

CREATE TABLE teams (
team_id SERIAL PRIMARY KEY,
team_name VARCHAR(100) NOT NULL,
tournament_id INT REFERENCES tournaments(tournament_id)
);

CREATE TABLE matches (
match_id SERIAL PRIMARY KEY,
team_1 INTEGER REFERENCES teams(team_id),
team_2 INTEGER REFERENCES teams(team_id),
tournament_id INTEGER REFERENCES tournaments(tournament_id),
match_date DATE,
match_time TIME
);