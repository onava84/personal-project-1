import { Typography, Box } from "@material-ui/core";
import React, { useState } from "react";
import MatchOpen from "../MatchOpen/MatchOpen";
import "./WeeksOpen.css";

const WeeksOpen = (props) => {
  const [matches, setMatches] = useState(props.matches);
  // console.log(matches);
  // const weekMatches = matches.filter(e => e.week === props.week)

  const matchesMap = matches.map((e) => {
    console.log(e.match_id);
    return <MatchOpen match={e} key={e.match_id} />;
  });

  // console.log(props.matches);
  // console.log(matches);

  return (
    <div className="displayed-weeks-open">
      <Typography variant="h5" color="primary" component="h2">
        <Box fontWeight="fontWeightBold">Week #{props.week}</Box>
      </Typography>
      {matchesMap}
    </div>
  );
};

export default WeeksOpen;
