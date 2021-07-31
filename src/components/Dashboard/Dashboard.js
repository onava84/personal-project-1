// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import axios from "axios";
import TournamentCard from "../TournamentCard/TournamentCard";
import "./Dashboard.css";

const Dashboard = (props) => {
  const username = useSelector((reduxState) => reduxState.username);
  const [tournaments, setTournaments] = useState([]);

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
  }, []);

  const deleteTournament = (id) => {
    const tourToBeRemoved = tournaments.findIndex((e) => {
      return e.id === id;
    });
    setTournaments(tournaments.splice(tourToBeRemoved, 1));
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

  return (
    <div>
      <h1>Dashboard component</h1>
      <p>Es h2 con {username}</p>
      <div className="tournament-card">{tournamentsMap}</div>
    </div>
  );
};

export default Dashboard;
