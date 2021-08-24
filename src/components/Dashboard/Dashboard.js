// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@material-ui/core";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
import axios from "axios";
import TournamentCard from "../TournamentCard/TournamentCard";
import "./Dashboard.css";
// import { Typography } from "@material-ui/core";

const Dashboard = (props) => {
  const username = useSelector((reduxState) => reduxState.username);
  const [tournaments, setTournaments] = useState([]);
  const [change, setChange] = useState(false);

  if (!username) {
    props.history.push("/login");
  }

  useEffect(() => {
    axios
      .get("/api/tournaments")
      .then((response) => {
        // console.log(response);
        setTournaments(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // }
  }, [change]);

  const deleteTournament = (id) => {
    const tourToBeRemoved = tournaments.findIndex((e) => {
      return e.id === id;
    });
    setTournaments(tournaments.splice(tourToBeRemoved, 1));
    setChange(!change);
  };

  // console.log(tournaments);

  const tournamentsMap = tournaments.map((e) => {
    return (
      <TournamentCard
        name={e.tournament_name}
        id={e.tournament_id}
        key={e.tournament_id}
        deleteTournament={deleteTournament}
      />
    );
  });

  console.log(username);
  return (
    <div>
      <Typography variant="h4" color="secondary">
        <Box fontWeight="fontWeightBold" mt={4}>
          Dashboard
        </Box>
      </Typography>

      {tournaments.length > 0 ? (
        <div className="main-dashboard">{tournamentsMap}</div>
      ) : (
        <div>
          <Box mt={4} mb={2}>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold" }}
              color="secondary"
            >
              You don't have any tournament yet, let's create one!
            </Typography>
          </Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            disableElevation
            href="/#/create-tournament"
          >
            Create new tournament
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
