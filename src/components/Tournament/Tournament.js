import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tournament.css";
import Weeks from "../Weeks/Weeks";
import { Typography, Box, Button, Container, Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";

const Tournament = (props) => {
  const [matches, setMatches] = useState([]);
  const params = useParams();
  // const [weekArray, setWeekArray] = useState([]);
  console.log(params);
  useEffect(() => {
    axios
      .get(`/api/matches?tournament_id=${params.id}`)
      .then((res) => {
        // console.log(res.data.sort());
        setMatches(res.data);
      })
      .catch((e) => console.log(e));
  }, [params.id]);

  console.log(props);
  let weeksLong = 0;
  const tourName = matches.length > 0 ? matches[0].tournament_name : null;
  if (matches.length > 0) {
    weeksLong = (matches.length / matches[0].teams_number) * 2;
  }
  const weeks = [];
  for (let i = 0; i < weeksLong; i++) {
    weeks.push([]);
  }

  const weeksMap = weeks.map((e, i, a) => {
    return (
      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
        <Weeks
          matches={matches.filter((e) => e.week_playing === i + 1)}
          index={i}
          week={i + 1}
          key={i}
        />
      </Grid>
    );
  });

  console.log(matches);
  const linkToTable = `/tournament-table/${params.id}`;

  return (
    <Container>
      <Typography variant="h4" color="secondary">
        <Box fontWeight="fontWeightBold" mt={4}>
          Edit {tourName}
        </Box>
        <Box mt={4} mb={4}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            disableElevation
            // fullWidth
            href={linkToTable}
            type="submit"
          >
            See tournament table
          </Button>
        </Box>
      </Typography>
      {/* <div className="main-tournament-page">{weeksMap}</div> */}
      <Grid container direction="row" spacing={3}>
        {weeksMap}
      </Grid>
    </Container>
  );
};

export default Tournament;
