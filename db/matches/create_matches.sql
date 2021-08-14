INSERT INTO matches
(team_1, team_2, tournament_id, week_playing)
VALUES
(${team_1}, ${team_2}, ${tournament_id}, ${week_playing})
RETURNING *;