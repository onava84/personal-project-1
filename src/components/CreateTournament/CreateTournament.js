import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, IconButton } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import "./CreateTournament.css";
import { makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

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
  const username = useSelector((reduxState) => reduxState.username);
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
  const [tournamentId, setTournamentId] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showTeamsNumError, setShowTeamsNumError] = useState(false);
  const userId = useSelector((reduxState) => reduxState.id);
  const [tournamentNameError, setTournamentNameError] = useState(false);
  const [teamsError, setTeamsError] = useState(false);
  // const [matches, setMatches] = useState([]);
  if (!username) {
    props.history.push("/login");
  }

  const handleNameInput = (e) => {
    setTournamentNameField(e.target.value);
    console.log(e.target.value); // si funciona el nombre del equipo
  };

  const handleChangeInput = (index, e) => {
    setTeams((prevState) => {
      const values = [...prevState];
      values[index][e.target.name] = e.target.value;
      console.log(e.target.value); // funciona cada campo escribe el nombre de x equipo
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
    };
    axios.post("/api/tournament", newObj).then((response) => {
      console.log(response);
      const id = response.data[0].tournament_id;
      setTournamentId(id);
      //create a list/array of promises
      createTeamNamesFromTournament(id);
    });
  };

  const createTeamNamesFromTournament = (id) => {
    const newTeamsToPost = {
      teams: teams,
      tournament_id: id,
    };
    axios
      .post("/api/teams", newTeamsToPost)
      .then((res) => {
        console.log(res.data); // estos son los equipos ya con el tour id, es un array de objects. Lo que quiero es que me de ya los matches
        // generateTournament(res.data);
        const matches = res.data;
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
    console.log(tournamentNameField);
    if (tournamentNameField === "") {
      console.log("texto prueba");
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
    console.log(teamsError, tournamentNameError);
    if (canPostTournament) {
      postTournament();
    }
  };

  console.log(username);

  return (
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
              {/* <input
              name="teamName"
              value={inputField.teamName}
              placeholder={`Team #${index + 1}`}
              onChange={(e) => handleChangeInput(index, e)}
            /> */}
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
            {/* <div>
              {index >= 4 ? (
                <p onClick={() => handleRemoveFields(index)}>-</p>
              ) : null}
              {index >= 3 ? <p onClick={() => handleAddFields()}>+</p> : null}
            </div> */}
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
    </div>
  );
};

export default CreateTournament;
