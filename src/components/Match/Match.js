import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Match.css";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TimePicker from "@mui/lab/TimePicker";
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
import RefereeSelect from "./RefereeSelect/RefereeSelect";
import FieldsSelect from "./Fields/FieldsSelect";
import DateTimeSelect from "./DateTimeSelect/DateTimeSelect";

const useStyles = makeStyles({
  btn: {
    display: "none",
  },
});

const Match = (props) => {
  const [editOpen, setEditOpen] = useState(false);
  const [match, setMatch] = useState({});
  // const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1));
  const [edit, setEdit] = useState(false);
  const [selectedReferee, setSelectedReferee] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`/api/matches/${props.match.match_id}`)
      .then((res) => {
        const { data: matchData } = res;
        // console.log(res.data);
        setMatch(matchData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [edit]);

  const clickHandler = () => {
    setEditOpen(!editOpen);
  };

  const handleSaveClick = () => {
    const updatedMatch = {
      match_date: format(selectedDate, "yyyy-MM-dd"),
      match_time: format(selectedDate, "HH:mm:ss"),
      referee_id: selectedReferee,
      field_id: selectedField,
    };
    // console.log("line 55");
    axios
      .put(`/api/matches/${match.match_id}`, updatedMatch)
      .then((res) => {
        console.log("se editaron la fecha y el horario");
        setEdit(!edit);
        //
        clickHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setSelectedDate(e);
  };

  // const nuevaFecha = new Date();
  console.log(selectedDate);

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

  console.log(props.match.referee_name);
  console.log(match);

  return (
    <div className="match-1">
      <div>
        <div className="teams-name">
          {props.match.team_1_name} VS {props.match.team_2_name}
        </div>
        <p className="date">
          Date:{" "}
          {match.match_date
            ? format(parseISO(match.match_date), "EEEE MMMM d yyyy")
            : "not defined"}
        </p>
        <p className="time">
          Time:{" "}
          {match.match_time
            ? format(parse(match.match_time, "HH:mm:ss", new Date()), "p")
            : "not defined"}
        </p>
        <p className="time">
          Referee: {match.referee_name ? match.referee_name : "Not defined"}
        </p>
        <p className="time">
          Field: {match.field_name ? match.field_name : "Not defined"}
        </p>
        <div className="picker">
          <div>
            {editOpen ? (
              <div>
                <DateTimeSelect setSelectedDate={setSelectedDate} />
                <FieldsSelect
                  fieldSelection={setSelectedField}
                  tournamentId={props.match.tournament_id}
                />
                <RefereeSelect
                  refereeSelection={setSelectedReferee}
                  tournamentId={props.match.tournament_id}
                />
              </div>
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
              style={{ marginTop: 5 }}
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
