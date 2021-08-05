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

  //creating the matches and put it in matches array
  const getMatches = async () => {
    const allMatches = [];
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        allMatches.push([teams[i], teams[j]]);
      }
    }
    setMatches(allMatches);
    console.log(allMatches, "TODOS LOS PARTIDOS");
    const response = await axios.post("/api/matches", allMatches);
    console.log(response, "RESPUESTA DE GUARDAR MATCHES");
  };

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

  async function createTeamNamesFromTournament(id, isEven) {
    const adjustedTeams = isEven ? teams : [...teams, { teamName: "Rest" }];
    // const promises = adjustedTeams.map(({ teamName }) => {
    //   const payload = {
    //     team_name: teamName,
    //     tournament_id: id,
    //   };

    // });

    // Mandar el array y que sea el back el que itere el array y guarde cada equipo
    // En el back, que te devuelva el array de equipos que ha guardado

    await axios.post("/api/teams", { teams: adjustedTeams });

    // Al tener la promesa de arriba el await, esto solo se ejecuta cuando se resuelve la promesa
    setTeams(adjustedTeams);

    // this Promise.all is waiting for ALL of the promises that we called in the previous step to finish.
    // when they're finished the .then will then fire with an array of all the responses of those promises.
    // Promise.all(promises)
    //   .then((res) => {
    //     // res is an array of axios responses (response.data)
    //     const newTeams = res.map(({ data }) => data[0]);
    //     setTeams(newTeams);
    //     console.log("teams", newTeams);
    //   })
    //   .catch(() => {
    //     console.log("hubo un problema agregando el equipo");
    //   });
  }

  const handleSubmit = (e) => {
    // console.log("tournament");
    e.preventDefault();
    let isEven = true;

    if (teams.length % 2 !== 0) {
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
