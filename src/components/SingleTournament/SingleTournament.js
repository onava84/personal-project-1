import React, { useState, useEffect } from "react";
import axios from "axios";
import WeeksOpen from "../WeeksOpen/WeeksOpen";
import "./SingleTournament.css";
import { Typography, Box } from "@material-ui/core";
// import { Box } from "@material-ui/core";

const SingleTournament = (props) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/allmatches?tournament_id=${props.match.params.id}`)
      .then((res) => {
        setMatches(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  let weeksLong = 0;
  const tourName = matches.length > 0 ? matches[0].tournament_name : null;
  if (matches.length > 0) {
    weeksLong = (matches.length / matches[0].teams_number) * 2;
  }
  const weeks = [];
  for (let i = 0; i < weeksLong; i++) {
    weeks.push([]);
  }

  // const weekuno = matches.filter((match) => match.week_playing === 1);
  console.log(weeks.length);
  const weeksMap = weeks.map((e, i, a) => {
    return (
      <WeeksOpen
        matches={matches.filter((match) => match.week_playing === i + 1)}
        week={i + 1}
        key={i}
      />
    );
  });

  return (
    <div>
      {/* <p>Nombre del torneo:</p> */}
      <Typography variant="h4" color="secondary" fontWeight="fontWeightBold">
        <Box fontWeight="fontWeightBold" mt={4}>
          {tourName}
        </Box>
      </Typography>
      <div className="main-tournament-page">{weeksMap}</div>
    </div>
  );
};

export default SingleTournament;
