import React from "react";

const TeamOneVsTeamTwo = (props) => {
  return (
    <div className="teams-name">
      {props.match.team_1_name} VS {props.match.team_2_name}
    </div>
  );
};

export default TeamOneVsTeamTwo;
