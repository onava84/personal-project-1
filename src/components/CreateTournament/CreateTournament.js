import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Box, IconButton } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import "./CreateTournament.css";
import { makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Login from "../Login/Login";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  btn: {
    marginTop: 20,
  },
  error: {
    marginTop: 10,
  },
});

const CreateTournament = (props) => {
  const classes = useStyles();
  // const username = useSelector((reduxState) => reduxState.username);
  // const username = useSelector((reduxState) => reduxState.username);
  const [tournamentNameField, setTournamentNameField] = useState("");
  const [teams, setTeams] = useState([
    {
      teamName: "",
    },
    {
      teamName: "",
    },
    {
      teamName: "",
    },
    {
      teamName: "",
    },
  ]);
  const [showTeamsNumError, setShowTeamsNumError] = useState(false);
  const [tournamentNameError, setTournamentNameError] = useState(false);
  const [teamsError, setTeamsError] = useState(false);
  const [value, setValue] = useState("single");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleNameInput = (e) => {
    setTournamentNameField(e.target.value);
    // console.log(e.target.value); si funciona el nombre del equipo
  };

  const handleChangeInput = (index, e) => {
    setTeams((prevState) => {
      const values = [...prevState];
      values[index][e.target.name] = e.target.value;
      // console.log(e.target.value); funciona cada campo escribe el nombre de x equipo
      return values;
    });
  };

  const handleAddFields = () => {
    if (teams.length === 20) {
      setShowTeamsNumError(true);
    } else {
      setTeams([...teams, { teamName: "" }]);
    }
  };

  const handleRemoveFields = (index) => {
    const values = [...teams];
    values.splice(index, 1);
    setTeams(values);
  };

  const postTournament = () => {
    const newObj = {
      tournament_name: tournamentNameField,
      teams_number: teams.length % 2 === 0 ? teams.length : teams.length + 1,
      tournament_type: value,
    };
    axios.post("/api/tournament", newObj).then((response) => {
      // console.log(response);
      const id = response.data[0].tournament_id;
      // setTournamentId(id);
      //create a list/array of promises
      createTeamNamesFromTournament(id, value);
    });
  };

  const createTeamNamesFromTournament = (id, tournament_type) => {
    const newTeamsToPost = {
      teams: teams,
      tournament_id: id,
      tournament_type: tournament_type,
    };
    axios
      .post("/api/teams", newTeamsToPost)
      .then((res) => {
        // console.log(res.data); estos son los equipos ya con el tour id, es un array de objects. Lo que quiero es que me de ya los matches
        // generateTournament(res.data);
        console.log(res.data);
        const matches = res.data;
        console.log(matches);
        axios
          .post("/api/matches", matches)
          .then(() => {
            console.log("post matches axios was called");
            props.history.push("/dashboard");
          })
          .catch(() =>
            console.log(
              "something went wrong with the axios post of tournament"
            )
          );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmit = (e) => {
    let canPostTournament = true;
    e.preventDefault();
    setTournamentNameError(false);
    setTeamsError(false);
    // console.log(tournamentNameField);
    if (tournamentNameField === "") {
      // console.log("texto prueba");
      setTournamentNameError(true);
      canPostTournament = false;
    }
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].teamName === "") {
        setTeamsError(true);
        canPostTournament = false;
      } else {
        console.log(
          "Aqui es el handle submit despues de agregar Rest como un equipo"
        );
      }
    }
    if (canPostTournament) {
      postTournament();
    }
  };

  console.log(value);

  return (
    <div>
      <div className="main-create-tournament">
        <Typography variant="h4" color="secondary">
          <Box fontWeight="fontWeightBold" mt={4} mb={3}>
            Create New Tournament
          </Box>
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            // className={classes.field}
            name="tournamentNameField"
            variant="outlined"
            label="What is the name of your tournament?"
            color="secondary"
            required
            onChange={handleNameInput}
            error={tournamentNameError}
            fullWidth
          ></TextField>
          <FormControl
            component="fieldset"
            style={{ marginTop: "25px", textAlign: "left", display: "flex" }}
          >
            <FormLabel
              component="legend"
              variant="h1"
              style={{
                fontSize: "22px",
                marginBottom: "10px",
                color: "#294b7a",
                fontWeight: "600",
              }}
              color="secondary"
            >
              Calendar type
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="single"
                control={<Radio />}
                label="One match"
              />
              <FormControlLabel
                value="double"
                control={<Radio />}
                label="Round trip matches"
              />
            </RadioGroup>
          </FormControl>
          {teams.map((inputField, index) => (
            <div key={index}>
              <div className="parejo">
                <div className="fields">
                  <TextField
                    // className={classes.field}
                    name="teamName"
                    value={inputField.teamName}
                    variant="outlined"
                    label={`Team #${index + 1}`}
                    color="secondary"
                    required
                    onChange={(e) => handleChangeInput(index, e)}
                    error={teamsError}
                    fullWidth
                  ></TextField>
                </div>
                <div>
                  {index >= 4 ? (
                    <IconButton
                      onClick={() => handleRemoveFields(index)}
                      color="primary"
                    >
                      <RemoveIcon />
                    </IconButton>
                  ) : null}
                  {index >= 3 ? (
                    <IconButton
                      onClick={() => handleAddFields()}
                      color="secondary"
                    >
                      <AddIcon />
                    </IconButton>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="contained"
            size="large"
            color="primary"
            disableElevation
            fullWidth
            type="submit"
            className={classes.btn}
          >
            Create tournament
          </Button>
        </form>
        {tournamentNameError ? (
          <Alert severity="error" className={classes.error}>
            You need to enter a name for your tournament.
          </Alert>
        ) : null}
        {teamsError ? (
          <Alert severity="error" className={classes.error}>
            All the teams should have a name.
          </Alert>
        ) : null}
        {showTeamsNumError ? (
          <Alert severity="error" className={classes.error}>
            You can add up to 20 teams.
          </Alert>
        ) : null}
      </div>
    </div>
  );
};

export default withRouter(CreateTournament);
