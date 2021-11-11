UPDATE matches
SET 
    match_date = ${match_date},
    referee_id = ${referee_id},
    field_id = ${field_id},
    team_1_goals = ${team_1_goals},
    team_2_goals = ${team_2_goals},
    played = ${played}
WHERE match_id = ${match_id}
RETURNING *