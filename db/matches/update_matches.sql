UPDATE matches
SET match_date = ${match_date},
    match_time = ${match_time}
WHERE match_id = ${match_id};