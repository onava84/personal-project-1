UPDATE matches
SET 
    match_date = ${match_date},
    referee_id = ${referee_id},
    field_id = ${field_id}
WHERE match_id = ${match_id}
RETURNING *