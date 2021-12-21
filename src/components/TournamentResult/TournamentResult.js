import React from "react";
import { Link } from "react-router-dom";
import "./TournamentResult.css";
import { Typography, Box, Button } from "@material-ui/core";

const TournamentResult = (props) => {
  return (
    <div className="main-div-tournament-page-open">
      <div className="name-and-button">
        <Typography variant="h6" color="secondary">
          <Box fontWeight="fontWeightBold" mr={4}>
            {props.name}
          </Box>
        </Typography>
        <Button
          variant="contained"
          component={Link}
          disableElevation
          color="primary"
          to={`/tournaments/${props.id}`}
          size="large"
        >
          See Schedule
        </Button>
        <Box sx={{ marginLeft: "20px" }}>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            disableElevation
            to={`/tournament-table/${props.id}`}
            component={Link}
          >
            See table
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default TournamentResult;
