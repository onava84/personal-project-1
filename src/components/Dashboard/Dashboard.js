// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import axios from "axios";

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

  const tournamentsMap = tournaments.map((e) => {
    return <p>{e.tournament_name}</p>;
  });
  return (
    <div>
      <h1>Dashboard component</h1>
      <p>Es h2 con {username}</p>
      <p>{tournamentsMap}</p>
    </div>
  );
};

export default Dashboard;
