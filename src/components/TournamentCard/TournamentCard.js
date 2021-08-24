// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TournamentCard.css";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
// import { Link } from "@material-ui/core";

const useStyles = makeStyles({
  heading: {
    textAlign: "left",
    marginBottom: 10,
    fontWeight: "bold",
  },
  btn: {
    marginTop: 10,
    marginBottom: 5,
  },
  title: {
    padding: 0,
  },
});

const TournamentCard = (props) => {
  const classes = useStyles();
  const clickDelete = () => {
    axios.delete(`/api/tournament/${props.id}`).then((res) => {
      props.deleteTournament(props.id);
    });
  };

  return (
    <div className="displayed-card">
      <div className="card-header">
        <Typography
          variant="h4"
          component="h2"
          className={classes.heading}
          color="secondary"
        >
          {props.name}
        </Typography>
        <IconButton onClick={(e) => clickDelete()} color="primary">
          <DeleteIcon />
        </IconButton>
      </div>
      <Button
        variant="contained"
        component={Link}
        disableElevation
        color="secondary"
        className={classes.btn}
        fullWidth
        to={`/admin/tournaments/${props.id}`}
        size="large"
      >
        Edit Matches
      </Button>
      <Button
        variant="contained"
        component={Link}
        disableElevation
        color="primary"
        className={classes.btn}
        fullWidth
        to={`/tournaments/${props.id}`}
        size="large"
      >
        See schedule
      </Button>
    </div>
  );
};

export default TournamentCard;
