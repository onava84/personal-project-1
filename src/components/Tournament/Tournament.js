import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tournament.css";
import Weeks from "../Weeks/Weeks";
import { Typography, Box } from "@material-ui/core";

const Tournament = (props) => {
  const [matches, setMatches] = useState([]);
  // const [weekArray, setWeekArray] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/matches?tournament_id=${props.match.params.id}`)
      .then((res) => {
        // console.log(res.data.sort());
        setMatches(res.data);
      })
      .catch((e) => console.log(e));
  }, [props.match.params.id]);

  // console.log(matches);
  let weeksLong = 0;
  const tourName = matches.length > 0 ? matches[0].tournament_name : null;
  if (matches.length > 0) {
    weeksLong = (matches.length / matches[0].teams_number) * 2;
  }
  const weeks = [];
  for (let i = 0; i < weeksLong; i++) {
    weeks.push([]);
  }

  const weeksMap = weeks.map((e, i, a) => {
    return (
      <Weeks
        matches={matches.filter((e) => e.week_playing === i + 1)}
        index={i}
        week={i + 1}
        key={i}
      />
    );
  });

  console.log(matches);

  return (
    <div>
      <Typography variant="h4" color="secondary">
        <Box fontWeight="fontWeightBold" mt={4}>
          Edit {tourName}
        </Box>
      </Typography>
      <div className="main-tournament-page">{weeksMap}</div>
    </div>
  );
};

export default Tournament;
