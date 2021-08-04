import React, { useState, useEffect } from "react";
import axios from "axios";
import Match from "../Match/Match";
import "./Tournament.css";

const Tournament = (props) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/matches?tournament_id=${props.match.params.id}`)
      .then((res) => {
        setMatches(res.data);
      });
  }, []);

  const tourName = matches.length > 0 ? matches[0].tournament_name : null;

  const matchesMap = matches.map((e, i, a) => {
    return (
      <div>
        <Match
          match_id={e.match_id}
          team1name={e.team_1_name}
          team2name={e.team_2_name}
          key={e.match_id}
        />
      </div>
    );
  });

  return (
    <div className="displayed-items">
      <h2>Tournament name:</h2>
      {tourName}
      {matchesMap}
    </div>
  );
};

export default Tournament;
