import axios from "axios";
import React, { useState } from "react";

const CreateTournament = (props) => {
  const [tournamentNameField, setTournamentNameField] = useState("");
  const [inputFields, setInputFields] = useState([
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
  const [showError, setShowError] = useState(false);
  const [showTeamsNumError, setShowTeamsNumError] = useState(false);
  const [numberOfTeams, setNumberOfTeams] = useState(0);

  const handleNameInput = (e) => {
    setTournamentNameField(e.target.value);
  };

  const handleChangeInput = (index, e) => {
    const values = [...inputFields];
    values[index][e.target.name] = e.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    if (inputFields.length === 20) {
      setShowTeamsNumError(true);
    } else {
      setInputFields([...inputFields, { teamName: "" }]);
    }
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let areEmpty = false;
    for (let i = 0; i < inputFields.length; i++) {
      if (inputFields[i].teamName === "") {
        areEmpty = true;
      }
    }
    // if there are empty fields will show the error, if not will update the # of fields
    if (areEmpty) {
      setShowError(true);
    } else {
      setNumberOfTeams(inputFields.length);
      const newObj = {
        tournament_name: tournamentNameField,
        teams_number: inputFields.length,
      };
      axios.post("/api/tournament", newObj).then().catch();
    }
  };

  return (
    <div>
      <h1>New way to do component</h1>
      {showError ? <p>You have to fill all the fields</p> : null}
      <form onSubmit={handleSubmit}>
        <label>
          What is your tournaments team?
          <input onChange={handleNameInput} />
        </label>
        {inputFields.map((inputField, index) => (
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
      </form>
    </div>
  );
};

export default CreateTournament;
