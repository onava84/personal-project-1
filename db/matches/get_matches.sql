-- SELECT * FROM matches
-- WHERE tournament_id = ${tournament_id};

-- select m.match_id, m.match_date, m.match_time, m.referee_id, m.field_id, m.week_playing, m.team_1, t.team_name as team_1_name, m.team_2, t2.team_name as team_2_name, m.tournament_id, tour.tournament_name, tour.teams_number from matches as m
-- join teams as t
-- on m.team_1 = t.team_id
-- join teams as t2
-- on m.team_2 = t2.team_id
-- join tournaments as tour
-- on m.tournament_id = tour.tournament_id
-- where m.tournament_id = ${tournament_id};

select m.match_id, m.match_date, m.match_time, m.referee_id, m.team_1_goals, m.team_2_goals,r.referee_name,m.field_id, f.field_name, m.week_playing, m.team_1, t.team_name as team_1_name, m.team_2, t2.team_name as team_2_name, m.tournament_id, tour.tournament_name, tour.teams_number from matches as m
join teams as t
on m.team_1 = t.team_id
join teams as t2
on m.team_2 = t2.team_id
left join referees as r
on m.referee_id = r.referee_id
left join fields as f
on m.field_id = f.field_id
join tournaments as tour
on m.tournament_id = tour.tournament_id
where m.tournament_id = ${tournament_id};

-- select m.match_id, m.match_date, m.match_time, r.referee_name, f.field_name, m.week_playing, m.team_1, t.team_name as team_1_name, m.team_2, t2.team_name as team_2_name, m.tournament_id, tour.tournament_name, tour.teams_number from matches as m
-- join teams as t
-- on m.team_1 = t.team_id
-- join teams as t2
-- on m.team_2 = t2.team_id
-- join referees as r
-- on r.referee_id = m.referee_id
-- join fields as f
-- on f.field_id = m.field_id
-- join tournaments as tour
-- on m.tournament_id = tour.tournament_id
-- where m.tournament_id = ${tournament_id};
