INSERT INTO teams
(team_name, tournament_id, tournament_type)
VALUES
($1, $2, $3)
RETURNING *;


-- INSERT INTO teams
-- (team_name, tournament_id)
-- VALUES
-- (${team_name}, ${tournament_id})
-- RETURNING *;