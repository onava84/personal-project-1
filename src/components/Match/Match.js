import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Match.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Grid } from "@mui/material";
// import { ListItem } from "@mui/material";
// import resultsModal from "./Modals/resultModals";
import { Button } from "@material-ui/core";
import ButtonGroup from "@mui/material/ButtonGroup";
import { makeStyles } from "@material-ui/core";
import { format, addDays, parseISO, parse } from "date-fns";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box, width } from "@mui/system";
import Modal from "@mui/material/Modal";
import { Typography } from "@material-ui/core";
import RefereeSelect from "./RefereeSelect/RefereeSelect";
import FieldsSelect from "./Fields/FieldsSelect";
import DateTimeSelect from "./DateTimeSelect/DateTimeSelect";
import DisplayMatchData from "./DisplayMatchData/DisplayMatchData";
import TeamOneVsTeamTwo from "./TeamOneVsTeamTwo/TeamOneVsTeamTwo";
import ScheduleGameButton from "./ScheduleGameButton/ScheduleGameButton";
import SetResultsButton from "./SetResultsButton/SetResultsButton";

const useStyles = makeStyles({
  btn: {
    display: "none",
  },
});

const Match = (props) => {
  const [match, setMatch] = useState({});
  const [edit, setEdit] = useState(false);
  const [selectedReferee, setSelectedReferee] = useState(
    props.match.referee_id
  );
  const [selectedField, setSelectedField] = useState(props.match.field_id);
  const [selectedDate, setSelectedDate] = useState(props.match.match_date);
  const [teamOneGoals, setTeamOneGoals] = useState(props.match.team_1_goals);
  const [teamTwoGoals, setTeamTwoGoals] = useState(props.match.team_2_goals);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`/api/matches/${props.match.match_id}`)
      .then((res) => {
        const { data } = res;
        setMatch(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [edit]);

  const handleSaveClickSchedule = () => {
    const updatedMatch = {
      match_date: selectedDate,
      referee_id: selectedReferee,
      field_id: selectedField,
      team_1_goals: teamOneGoals,
      team_2_goals: teamTwoGoals,
    };
    axios
      .put(`/api/matches/${match.match_id}`, updatedMatch)
      .then((res) => {
        setEdit(!edit);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const resetStateValues = () => {
  //   setSelectedReferee(props.match.referee_id);
  //   setSelectedField(props.match.field_id);
  //   setSelectedDate(props.match.match_date);
  //   setTeamOneGoals(props.match.team_1_goals);
  //   setTeamTwoGoals(props.match.team_2_goals);
  // };

  // console.log(
  //   selectedField,
  //   selectedReferee,
  //   match.team_1_name,
  //   match.team_2_name,
  //   teamOneGoals,
  //   teamTwoGoals
  // );

  console.log(match);

  return (
    <div className="match-1">
      {match.team_1_name !== "Rest" && match.team_2_name !== "Rest" ? (
        <div>
          <TeamOneVsTeamTwo match={match} />
          <DisplayMatchData match={match} />
          <Box mb={1}>
            <ScheduleGameButton
              match={match}
              dbSelectedDate={props.match.match_date}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedField={selectedField}
              setSelectedField={setSelectedField}
              selectedReferee={selectedReferee}
              setSelectedReferee={setSelectedReferee}
              tournamentId={match.tournament_id}
              saveAndClose={handleSaveClickSchedule}
            />
          </Box>
          <Box>
            <SetResultsButton
              match={match}
              teamOneGoals={teamOneGoals}
              teamTwoGoals={teamTwoGoals}
              setTeamOneGoals={setTeamOneGoals}
              setTeamTwoGoals={setTeamTwoGoals}
              tournamentId={match.tournament_id}
              saveAndClose={handleSaveClickSchedule}
              // resetStateValues={resetStateValues}
            />
          </Box>
        </div>
      ) : (
        <Box>
          {match.team_1_name === "Rest" ? (
            <Typography variant="h5" color="secondary">
              {match.team_2_name} descansa
            </Typography>
          ) : (
            <Typography variant="h5" color="secondary">
              {match.team_1_name} descansa
            </Typography>
          )}
        </Box>
      )}
    </div>
  );
};

export default Match;
