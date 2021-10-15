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

const useStyles = makeStyles({
  btn: {
    display: "none",
  },
});

const Match = (props) => {
  const [editOpen, setEditOpen] = useState(false);
  const [match, setMatch] = useState({});
  const [edit, setEdit] = useState(false);
  const [selectedReferee, setSelectedReferee] = useState(
    props.match.referee_id
  );
  const [checked, setChecked] = useState(false);
  const [selectedField, setSelectedField] = useState(props.match.field_id);
  const [selectedDate, setSelectedDate] = useState(props.match.match_date);
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [openRes, setOpenRes] = useState(false);
  const handleOpenRes = () => setOpenRes(true);
  const handleCloseRes = () => setOpenRes(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      match_date: selectedDate,
      referee_id: selectedReferee,
      field_id: selectedField,
    };
    console.log(updatedMatch);
    axios
      .put(`/api/matches/${match.match_id}`, updatedMatch)
      .then((res) => {
        // console.log("se editaron la fecha y el horario");
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

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "white",
    border: "none",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };

  const saveAndClose = () => {
    handleSaveClick();
    handleClose();
  };

  const saveResultsAndClose = () => {
    handleCloseRes();
  };

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };

  const scheduleModal = (
    <Box sx={style}>
      <Box>
        <DateTimeSelect
          defaultDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <RefereeSelect
          refereeSelection={setSelectedReferee}
          tournamentId={match.tournament_id}
          defaultReferee={selectedReferee}
        />
        <FieldsSelect
          fieldSelection={setSelectedField}
          tournamentId={props.match.tournament_id}
          defaultField={selectedField}
        />
      </Box>
      <Box mt={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          disableElevation
        >
          Cerrar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={saveAndClose}
          disableElevation
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );

  const resultsModal = (
    <Box sx={style2}>
      <Box>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="This game is already played"
            checked={checked}
            onChange={handleSwitchChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </FormGroup>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <Box>
                <Typography variant="h4" align="center">
                  {match.team_1_name}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" align="center">
                  0
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box>
                <Typography variant="h2" align="center">
                  -
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box>
                <Typography variant="h4" align="center">
                  {match.team_2_name}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" align="center">
                  0
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mt={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCloseRes}
          disableElevation
        >
          Cerrar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={saveResultsAndClose}
          disableElevation
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );

  console.log(checked);

  return (
    <div className="match-1">
      {match.team_1_name !== "Rest" && match.team_2_name !== "Rest" ? (
        <div>
          <div className="teams-name">
            {match.team_1_name} VS {match.team_2_name}
          </div>
          <p className="date">
            Date:{" "}
            {match.match_date
              ? format(parseISO(match.match_date), "EEEE MMMM d yyyy")
              : "Not defined"}
          </p>
          <p className="time">
            Time:{" "}
            {match.match_date
              ? format(parseISO(match.match_date), "p")
              : "Not defined"}
          </p>
          <p className="time">
            Referee: {match.referee_name ? match.referee_name : "Not defined"}
          </p>
          <p className="time">
            Field: {match.field_name ? match.field_name : "Not defined"}
          </p>
          <div className="picker">
            <div>
              <Box>
                <ButtonGroup disableElevation variant="contained">
                  <Button onClick={handleOpen} color="secondary">
                    Schedule game
                  </Button>
                  <Button onClick={handleOpenRes}>Set results</Button>
                </ButtonGroup>
              </Box>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                {scheduleModal}
              </Modal>
              <Modal
                open={openRes}
                onClose={handleCloseRes}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                {resultsModal}
              </Modal>
            </div>
          </div>
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
