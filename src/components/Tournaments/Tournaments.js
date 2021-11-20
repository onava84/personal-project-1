import axios from "axios";
import React, { useState, useEffect } from "react";
import TournamentResult from "../TournamentResult/TournamentResult";
import { Typography, Box, TextField } from "@material-ui/core";
import "./Tournaments.css";

const Tournaments = (props) => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    axios
      .get("/api/alltournaments")
      .then((res) => {
        setTournaments(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleNameInput = (e) => {
    console.log(e.target.value);
    axios
      .get(`/api/alltournaments?tournament_name=${e.target.value}`)
      .then((res) => {
        setTournaments(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // setTournamentNameField(e.target.value);
    // console.log(e.target.value); // si funciona el nombre del equipo
  };

  const tournamentsMap = tournaments.map((e, i, a) => {
    // return <p key={e.tournament_id}>{e.tournament_name}</p>;
    return (
      <TournamentResult
        id={e.tournament_id}
        name={e.tournament_name}
        key={e.tournament_id}
      />
    );
  });

  return (
    <div className="main-div-tournaments">
      <Typography variant="h5" color="secondary">
        <Box fontWeight="fontWeightBold" mt={4} mb={0.5}>
          Search tournament:
        </Box>
      </Typography>
      <div className="form-container">
        <form className="form">
          <TextField
            variant="outlined"
            label="Type the name of your tournament"
            color="secondary"
            fullWidth
            onChange={handleNameInput}
          ></TextField>
        </form>
      </div>
      <div className="display-results">{tournamentsMap}</div>
    </div>
  );
};

export default Tournaments;
