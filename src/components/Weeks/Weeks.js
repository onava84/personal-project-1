import React, { useState } from "react";
import Match from "../Match/Match";
import "./Weeks.css";
import { Typography, Box } from "@material-ui/core";

const Weeks = (props) => {
  const [matches] = useState(props.matches);
  // console.log(matches);
  // const weekMatches = matches.filter(e => e.week === props.week)

  const matchesMap = matches.map((e) => {
    return <Match match={e} key={e.match_id} />;
  });

  // console.log(props.matches);
  // console.log(matches);

  return (
    <div className="displayed-weeks-open-1">
      <Typography variant="h5" color="primary" component="h2">
        <Box fontWeight="fontWeightBold">Week #{props.week}</Box>
      </Typography>
      {matchesMap}
    </div>
  );
};

export default Weeks;
