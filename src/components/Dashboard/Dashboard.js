import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Container, Grid } from "@material-ui/core";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
import axios from "axios";
import TournamentCard from "../TournamentCard/TournamentCard";
import "./Dashboard.css";

const Dashboard = () => {
  const [tournaments, setTournaments] = useState([]);
  const [change, setChange] = useState(false);
  // const [loading,setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/tournaments")
      .then((response) => {
        setTournaments(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [change]);

  const deleteTournament = (id) => {
    const tourToBeRemoved = tournaments.findIndex((e) => {
      return e.id === id;
    });
    setTournaments(tournaments.splice(tourToBeRemoved, 1));
    setChange(!change);
  };

  const tournamentsMap = tournaments.map((e) => {
    return (
      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
        <TournamentCard
          name={e.tournament_name}
          id={e.tournament_id}
          key={e.tournament_id}
          deleteTournament={deleteTournament}
        />
      </Grid>
    );
  });

  return (
    <Container>
      <Typography variant="h4" color="secondary">
        <Box fontWeight="fontWeightBold" mt={4} mb={4}>
          Dashboard
        </Box>
      </Typography>
      <Box mb={4}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          disableElevation
          // fullWidth
          href="/create-tournament"
          type="submit"
        >
          Create tournament +
        </Button>
      </Box>
      {tournaments.length > 0 ? (
        // <div className="main-dashboard">{tournamentsMap}</div>
        <Grid container direction="row" spacing={3}>
          {tournamentsMap}
        </Grid>
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
            href="/create-tournament"
          >
            Create new tournament
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
