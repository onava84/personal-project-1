SELECT * FROM tournaments
-- WHERE tournament_name ILIKE ${tournament_name};
WHERE tournament_name ILIKE ${tournament_name} || '%'
OR tournament_name ILIKE '%' || ${tournament_name} || '%';
