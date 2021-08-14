import React, { useState } from "react";
import Match from "../Match/Match";

const Weeks = (props) => {
  const [matches, setMatches] = useState(props.matches);
  // console.log(matches);
  // const weekMatches = matches.filter(e => e.week === props.week)

  const matchesMap = matches.map((e) => {
    return <Match match={e} key={e.match_id} />;
  });

  // console.log(props.matches);
  // console.log(matches);

  return (
    <div className="displayed-items">
      <h2>Week number #{props.week}</h2>
      {matchesMap}
    </div>
  );
};

export default Weeks;
