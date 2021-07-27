// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import axios from "axios";
import "./Tournament.css";
import { Link } from "react-router-dom";

const TournamentCard = (props) => {
  return (
    <div className="displayed-items">
      <p>{props.name}</p>
      <Link to={`/tournaments/${props.id}`}>Edit matches</Link>
      <button>See schedule</button>
    </div>
  );
};

export default TournamentCard;
