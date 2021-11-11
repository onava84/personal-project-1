import React, { useState, useEffect } from "react";
import { Button, Modal, Typography, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import DateTimeSelect from "../DateTimeSelect/DateTimeSelect";
import RefereeSelect from "../RefereeSelect/RefereeSelect";
import FieldsSelect from "../Fields/FieldsSelect";
import TeamOneVsTeamTwo from "../TeamOneVsTeamTwo/TeamOneVsTeamTwo";
import { Grid } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Switch from "@mui/material/Switch";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const SetResultsButton = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  /////SWITCHER STATE
  const [checked, setChecked] = useState(props.played);
  /////
  const [teamOneScore, setTeamOneScore] = useState(props.teamOneGoals);
  const [teamTwoScore, setTeamTwoScore] = useState(props.teamTwoGoals);
  ////
  useEffect(() => {
    props.setTeamOneGoals(teamOneScore);
    props.setTeamTwoGoals(teamTwoScore);
    props.setPlayed(checked);
  }, [teamOneScore, teamTwoScore, checked]);

  const handleRemove = (state, setScoreState) => {
    if (state >= 1) {
      setScoreState(state - 1);
    }
  };

  const handleAdd = (state, setScoreState) => {
    if (state <= 14) {
      setScoreState(state + 1);
    }
  };

  const handleClickSave = () => {
    props.saveAndClose();
    handleClose();
  };

  const cancelAndReset = () => {
    setTeamOneScore(props.match.team_1_goals);
    setTeamTwoScore(props.match.team_2_goals);
    setChecked(props.match.played);
    // props.resetStateValues();
    handleClose();
  };

  ////SWITCHER CHANGE
  const switcherChange = (event) => {
    setChecked(event.target.checked);
    props.setPlayed(event.target.checked);
  };

  // console.log(props.match);
  // console.log(props.played);

  const setResultsModal = (
    <Box sx={style}>
      <Box>
        <Switch
          checked={checked}
          onChange={switcherChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Typography textAlign="center">
              {props.match.team_1_name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => handleRemove(teamOneScore, setTeamOneScore)}
                color="primary"
              >
                <RemoveCircleIcon fontSize="large" />
              </IconButton>
              <Typography textAlign="center" variant="h3">
                {teamOneScore ? teamOneScore : 0}
              </Typography>
              <IconButton
                onClick={() => handleAdd(teamOneScore, setTeamOneScore)}
                color="secondary"
              >
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box>
              <Typography textAlign="center">vs</Typography>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Typography textAlign="center">
              {props.match.team_2_name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => handleRemove(teamTwoScore, setTeamTwoScore)}
                color="primary"
              >
                <RemoveCircleIcon fontSize="large" />
              </IconButton>
              <Typography textAlign="center" variant="h3">
                {teamTwoScore ? teamTwoScore : 0}
              </Typography>
              <IconButton
                onClick={() => handleAdd(teamTwoScore, setTeamTwoScore)}
                color="secondary"
              >
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={cancelAndReset}
          disableElevation
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickSave}
          disableElevation
        >
          Save
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Button onClick={handleOpen} color="secondary" variant="contained">
        Set Results
      </Button>
      <Modal
        onBackdropClick={cancelAndReset}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{setResultsModal}</Box>
      </Modal>
    </Box>
  );
};

export default SetResultsButton;
