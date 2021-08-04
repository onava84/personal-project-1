import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";

const CreateTournament = (props) => {
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
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getMatches();
  }, [teams]);

  const getMatches = () => {
    const allMatches = [];
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        allMatches.push([teams[i], teams[j]]);
      }
    }
    setMatches(allMatches);
  };
  ////// this is the code I should fix using promises
  const postMatches = () => {
    for (let i = 0; i < matches.length; i++) {
      const newMatch = {
        team_1: matches[i][0].team_id,
        team_2: matches[i][1].team_id,
        tournament_id: tournamentId,
      };
      axios.post("/api/matches", newMatch).then(() => {
        console.log("the match was added correctly");
      });
    }
  };
  // function postMatches() {
  //   const promises = matches.map((e, i, a) => {
  //     console.log(e);
  //     const payload = {
  //       team_1: e[0].team_id,
  //       team_2: e[1].team_id,
  //       tournament_id: e[0].tournament_id,
  //     };
  //     return axios.post("/api/matches", payload);
  //   });
  //   Promise.all(promises)
  //     .then((res) => {
  //       console.log(res);
  //       console.log("the teams are posted");
  //     })
  //     .catch(() => {
  //       console.log("this is the catch of the postAllMatches");
  //     });
  // }
  ////// here ends the matches I want to post
  const handleNameInput = (e) => {
    setTournamentNameField(e.target.value);
  };

  const handleChangeInput = (index, e) => {
    const values = [...teams];
    values[index][e.target.name] = e.target.value;
    setTeams(values);
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

  //this function will be used when submit the form to check if we have to substract 1 or not
  const postTournamentAndGetTeams = (isEven) => {
    const newObj = {
      tournament_name: tournamentNameField,
      teams_number: isEven ? teams.length : teams.length + 1,
    };
    axios.post("/api/tournament", newObj).then((response) => {
      // console.log(response.data[0].tournament_id);
      const id = response.data[0].tournament_id;
      setTournamentId(id);
      //create a list/array of promises
      createTeamNamesFromTournament(id, isEven);
    });
  };

  function createTeamNamesFromTournament(id, isEven) {
    const adjustedTeams = isEven ? teams : [...teams, { teamName: "Rest" }];
    const promises = adjustedTeams.map(({ teamName }) => {
      const payload = {
        team_name: teamName,
        tournament_id: id,
      };
      return axios.post("/api/teams", payload);
    });

    // this Promise.all is waiting for ALL of the promises that we called in the previous step to finish.
    // when they're finished the .then will then fire with an array of all the responses of those promises.
    Promise.all(promises)
      .then((res) => {
        // res is an array of axios responses (response.data)
        const newTeams = res.map(({ data }) => data[0]);
        setTeams(newTeams);
        console.log("teams", newTeams);
      })
      .catch(() => {
        console.log("hubo un problema agregando el equipo");
      });
  }

  const handleSubmit = (e) => {
    // console.log("tournament");
    e.preventDefault();
    let isEven = true;
    if (teams.length % 2 === 0) {
    } else {
      isEven = false;
    }
    if (isEven) {
      console.log("# of teams", teams.length);
      postTournamentAndGetTeams(isEven);
      // postMatches();
    } else {
      setTeams([...teams, { teamName: "Rest" }]); // do this in the backend
      console.log("# of teams", teams.length);
      postTournamentAndGetTeams(isEven);
      // postMatches();
    }
  };

  console.log(teams);
  console.log(matches);

  return (
    <div>
      <p>{username}</p>
      <Typography variant="h4" component="h1">
        Create tournament component
      </Typography>
      {showError ? <p>You have to fill all the fields</p> : null}
      {tournamentNameError ? <p>You need a name for your tournament</p> : null}
      <form onSubmit={handleSubmit}>
        <label>
          What is your tournaments name?
          <input onChange={handleNameInput} />
        </label>
        {teams.map((inputField, index) => (
          <div key={index}>
            <input
              name="teamName"
              value={inputField.teamName}
              placeholder={`Team #${index + 1}`}
              onChange={(e) => handleChangeInput(index, e)}
            />
            <div>
              {index >= 4 ? (
                <p onClick={() => handleRemoveFields(index)}>-</p>
              ) : null}
              {index >= 3 ? <p onClick={() => handleAddFields()}>+</p> : null}
            </div>
          </div>
        ))}
        {showTeamsNumError ? (
          <p>Your tournament cannot has more than 20 teams</p>
        ) : null}
        <button>Generate tournament</button>
        <p>{teams.length}</p>
      </form>
    </div>
  );
};

export default CreateTournament;
