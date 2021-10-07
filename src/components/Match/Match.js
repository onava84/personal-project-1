import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Match.css";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core";
import { format, addDays, parseISO, parse } from "date-fns";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box, width } from "@mui/system";
import Modal from "@mui/material/Modal";
import { Typography } from "@material-ui/core";
import RefereeSelect from "./RefereeSelect.js/RefereeSelect";
import FieldsSelect from "./Fields/FieldsSelect";

const useStyles = makeStyles({
  btn: {
    display: "none",
  },
});

const Match = (props) => {
  const [editOpen, setEditOpen] = useState(false);
  const [match, setMatch] = useState({});
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1));
  const [edit, setEdit] = useState(false);
  const [selectedReferee, setSelectedReferee] = useState("");
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`/api/matches/${props.match.match_id}`)
      .then((res) => {
        const { data: matchData } = res;
        setMatch(matchData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [edit, props.match.match_id]);

  const clickHandler = () => {
    setEditOpen(!editOpen);
  };

  const handleSaveClick = () => {
    const updatedMatch = {
      match_date: format(selectedDate, "yyyy-MM-dd"),
      match_time: format(selectedDate, "HH:mm:ss"),
      referee_id: selectedReferee,
    };
    console.log("line 55");
    axios
      .put(`/api/matches/${match.match_id}`, updatedMatch)
      .then((res) => {
        console.log("se editaron la fecha y el horario");
        // if (match.match_date !== null || match.match_time !== null) {
        setEdit(!edit);
        //
        clickHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const nuevaFecha = new Date();
  console.log(selectedReferee);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "none",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };

  // console.log(props);

  return (
    <div className="match-1">
      <div>
        <div className="teams-name">
          {props.match.team_1_name} VS {props.match.team_2_name}
        </div>
        <p className="date">
          Date:{" "}
          {match.match_date
            ? // ? format(selectedDate, "LLLL d yyyy")
              // match.match_date
              format(parseISO(match.match_date), "EEEE MMMM d yyyy")
            : "not defined"}
        </p>
        <p className="time">
          Time:{" "}
          {match.match_time
            ? // ? format(selectedDate, "HH:mm")
              format(parse(match.match_time, "HH:mm:ss", new Date()), "p")
            : "not defined"}
        </p>

        <div className="picker">
          <div>
            {editOpen ? (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div>
                  <DateTimePicker
                    value={selectedDate}
                    onChange={setSelectedDate}
                    label="Select Date & Time"
                    color="primary"
                    className="selector"
                  />
                </div>
                <FieldsSelect tournamentId={props.match.tournament_id} />
                <RefereeSelect
                  refereeSelection={setSelectedReferee}
                  tournamentId={props.match.tournament_id}
                />
              </MuiPickersUtilsProvider>
            ) : (
              ""
            )}
          </div>
          <div className="buttons">
            <Button
              disableElevation
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: 15 }}
              size="large"
              onClick={(e) => clickHandler()}
              startIcon={!editOpen ? <EditIcon /> : null}
            >
              {editOpen ? "Cancel" : "Edit Date & Time"}
            </Button>
            <Button
              className={!editOpen ? classes.btn : ""}
              onClick={handleSaveClick}
              variant="contained"
              color="secondary"
              fullWidth
              disableElevation
              style={{ marginTop: 15 }}
              size="large"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Match;
