INSERT INTO matches
(team_1, team_2, tournament_id)
VALUES
(${team_1}, ${team_2}, ${tournament_id})
RETURNING *;