INSERT INTO teams
(team_name, tournament_id)
VALUES
(${team_name}, ${tournament_id})
RETURNING *;