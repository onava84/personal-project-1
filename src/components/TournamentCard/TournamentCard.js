// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import axios from "axios";
import "./Tournament.css";
import { Link } from "react-router-dom";

const TournamentCard = (props) => {
  const clickDelete = () => {
    axios.delete(`/api/tournament/${props.id}`).then((res) => {
      props.deleteTournament(props.id);
    });
  };

  // console.log(props);

  return (
    <div className="displayed-items">
      <p className="delete-tour-button" onClick={() => clickDelete()}>
        X
      </p>
      <p>{props.name}</p>
      <Link to={`/admin/tournaments/${props.id}`}>Edit matches</Link>
      <button>See schedule</button>
    </div>
  );
};

export default TournamentCard;
