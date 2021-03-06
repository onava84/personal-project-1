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
team_1 VARCHAR(100) REFERENCES teams(team_name),
team_2 VARCHAR(100) REFERENCES teams(team_name),
tournament_id INTEGER REFERENCES tournaments(tournament_id),
match_date DATE,
match_time TIME
);

/////ESTE ES EL FILTRO PARA SACAR LA TABLA GENERAL

select team_name "TEAM",sum(Points) "POINTS",sum(played) as "MATCHES PLAYED",
sum(WinCount) "MATCHES WON",sum(LostCount) "LOST MATCHES",sum(Tie) "TIED MATCHES",
sum("Goals in Favour") "GOALS IN FAVOUR",
sum("Goals Against") "GOALS AGAINST"
from 
(

		select t.team_name
		,count(*)  AS Played
		,count(*) FILTER (WHERE  team_1_goals> team_2_goals) AS WinCount
		,count(*) FILTER (WHERE  team_1_goals< team_2_goals) AS LostCount
		,count(*) FILTER (WHERE  team_1_goals= team_2_goals) AS Tie
		,(((count(*) FILTER (WHERE  team_1_goals> team_2_goals))*3)+count(*) FILTER (WHERE  team_1_goals= team_2_goals)) as Points
		,sum(team_1_goals) as "Goals in Favour"
		,sum(team_2_goals) as "Goals Against"


		from matches m inner join teams t 
		on m.team_1=t.team_id
	    where m.played='t'
		group by t.team_name

		union 

		select t.team_name
		,count(*)  AS Played
		,count(*) FILTER (WHERE  team_1_goals< team_2_goals) AS WinCount
		,count(*) FILTER (WHERE  team_1_goals> team_2_goals) AS LostCount
		,count(*) FILTER (WHERE  team_1_goals= team_2_goals) AS Tie
		,(((count(*) FILTER (WHERE  team_1_goals< team_2_goals))*3)+count(*) FILTER (WHERE  team_1_goals= team_2_goals)) as Points
		,sum(team_2_goals) as "Goals in Favour"
		,sum(team_1_goals) as "Goals Against"


		from matches m inner join teams t 
		on m.team_2=t.team_id
		where m.played='t'
		group by t.team_name

)sub
group by team_name;