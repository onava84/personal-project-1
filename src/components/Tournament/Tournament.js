import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import axios from "axios";

const Tournament = (props) => {
  const [tournamentName, setTournamentName] = useState("");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/matches?tournament_id=${props.match.params.id}`)
      .then((res) => {
        setMatches(res.data);
      });
    axios.get(`/api/tournament/${props.match.params.id}`).then((res) => {
      setTournamentName(res.data[0].tournament_name);
    });
  }, []);

  console.log(matches);

  const matchesMap = matches.map((e, i) => {
    return (
      <div key={e.match_id}>
        {e.team_1} VS {e.team_2}
      </div>
    );
  });

  return (
    <div className="displayed-items">
      <h2>Tournament name:</h2>
      <h1>{tournamentName}</h1>
      {matchesMap}
    </div>
  );
};

export default Tournament;
