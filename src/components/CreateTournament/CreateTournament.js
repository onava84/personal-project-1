import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Tournament from "round-robin-tournament";

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
  const postTournamentAndGetTeams = (toSubstract) => {
    const newObj = {
      tournament_name: tournamentNameField,
      teams_number: teams.length - toSubstract,
    };
    axios.post("/api/tournament", newObj).then((response) => {
      // console.log(response.data[0].tournament_id);
      const id = response.data[0].tournament_id;
      setTournamentId(id);
      //create a list/array of promises
      createTeamNamesFromTournament(id);
    });
  };

  function createTeamNamesFromTournament(id) {
    const promises = teams.map(({ teamName }) => {
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
      // setMatches(torneo.matches);
      postTournamentAndGetTeams(0);
    } else {
      setTeams([...teams, { teamName: "Rest" }]); // do this in the backend
      postTournamentAndGetTeams(1);
    }
  };

  console.log(teams);

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
//-------------------------------------------------
// const CreateTournament = (props) => {
//   const [tournamentNameField, setTournamentNameField] = useState("");
//   const [inputFields, setInputFields] = useState([
//     {
//       teamName: "",
//     },
//     {
//       teamName: "",
//     },
//     {
//       teamName: "",
//     },
//     {
//       teamName: "",
//     },
//   ]);
//   const [showError, setShowError] = useState(false);
//   const [showTeamsNumError, setShowTeamsNumError] = useState(false);
//   const [numberOfTeams, setNumberOfTeams] = useState(0);
//   const username = useSelector((reduxState) => reduxState.username);
//   const userId = useSelector((reduxState) => reduxState.id);
//   const [tournamentNameError, setTournamentNameError] = useState(false);
//   const [tourId, setTourId] = useState(0);

//   useEffect(() => {
//     if (!username) {
//       props.history.push("/login");
//     }
//   }, []);

//   const handleNameInput = (e) => {
//     setTournamentNameField(e.target.value);
//   };

//   const handleChangeInput = (index, e) => {
//     const values = [...inputFields];
//     values[index][e.target.name] = e.target.value;
//     setInputFields(values);
//   };

//   const handleAddFields = () => {
//     if (inputFields.length === 20) {
//       setShowTeamsNumError(true);
//     } else {
//       setInputFields([...inputFields, { teamName: "" }]);
//     }
//   };

//   const handleRemoveFields = (index) => {
//     const values = [...inputFields];
//     values.splice(index, 1);
//     setInputFields(values);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (tournamentNameField === "") {
//       setTournamentNameError(true);
//     } else {
//       let areEmpty = false;
//       for (let i = 0; i < inputFields.length; i++) {
//         if (inputFields[i].teamName === "") {
//           areEmpty = true;
//         }
//       }
//       // if there are empty fields will show the error, if not will update the # of fields
//       if (areEmpty) {
//         setShowError(true);
//       } else {
//         //create an object with the info
//         setNumberOfTeams(inputFields.length);
//         const newObj = {
//           tournament_name: tournamentNameField,
//           teams_number: inputFields.length,
//         };
//         axios.post("/api/tournament", newObj).then((response) => {
//           setTourId(response.data[0].tournament_id);
//         });
//       }
//     }
//   };

//   const torneo = new Tournament(inputFields);
//   const juegos = torneo.matches;
//   // console.log(juegos);

//   return (
//     <div>
//       <Typography variant="h4" component="h1">
//         Create tournament component
//       </Typography>
//       {showError ? <p>You have to fill all the fields</p> : null}
//       {tournamentNameError ? <p>You need a name for your tournament</p> : null}
//       <form onSubmit={handleSubmit}>
//         <label>
//           What is your tournaments team?
//           <input onChange={handleNameInput} />
//         </label>
//         {inputFields.map((inputField, index) => (
//           <div key={index}>
//             <input
//               name="teamName"
//               value={inputField.teamName}
//               placeholder={`Team #${index + 1}`}
//               onChange={(e) => handleChangeInput(index, e)}
//             />
//             <div>
//               {index >= 4 ? (
//                 <p onClick={() => handleRemoveFields(index)}>-</p>
//               ) : null}
//               {index >= 3 ? <p onClick={() => handleAddFields()}>+</p> : null}
//             </div>
//           </div>
//         ))}
//         {showTeamsNumError ? (
//           <p>Your tournament cannot has more than 20 teams</p>
//         ) : null}
//         <button>Generate tournament</button>
//       </form>
//       <p>
//         {juegos[0][0][0].teamName} vs {juegos[0][0][1].teamName}
//       </p>
//       {/* <p>{tourId}</p> */}
//     </div>
//   );
// };

// export default CreateTournament;
