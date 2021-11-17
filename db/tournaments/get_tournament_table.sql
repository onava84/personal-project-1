select team_name "TEAM",sum(Points) "POINTS",sum(played) as "MATCHES PLAYED",
sum(WinCount) "MATCHES WON",sum(LostCount) "LOST MATCHES",sum(Tie) "TIED MATCHES",
sum("Goals in Favour") "GOALS IN FAVOUR",
sum("Goals Against") "GOALS AGAINST"
from
(

select t.team_name
,count(*) AS Played
,count(*) FILTER (WHERE team_1_goals> team_2_goals) AS WinCount
,count(*) FILTER (WHERE team_1_goals< team_2_goals) AS LostCount
,count(*) FILTER (WHERE team_1_goals= team_2_goals) AS Tie
,(((count(*) FILTER (WHERE team_1_goals> team_2_goals))*3)+count(*) FILTER (WHERE team_1_goals= team_2_goals)) as Points
,sum(team_1_goals) as "Goals in Favour"
,sum(team_2_goals) as "Goals Against"


from matches m inner join teams t
on m.team_1=t.team_id
where m.played='t' and m.tournament_id=346
group by t.team_name

union

select t.team_name
,count(*) AS Played
,count(*) FILTER (WHERE team_1_goals< team_2_goals) AS WinCount
,count(*) FILTER (WHERE team_1_goals> team_2_goals) AS LostCount
,count(*) FILTER (WHERE team_1_goals= team_2_goals) AS Tie
,(((count(*) FILTER (WHERE team_1_goals< team_2_goals))*3)+count(*) FILTER (WHERE team_1_goals= team_2_goals)) as Points
,sum(team_2_goals) as "Goals in Favour"
,sum(team_1_goals) as "Goals Against"


from matches m inner join teams t
on m.team_2=t.team_id
where m.played='t' and m.tournament_id=${id}
group by t.team_name

)sub
group by team_name;