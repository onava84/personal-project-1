import React from "react";
import { useState } from "react";
import "./CreateTournament.css";

const CreateTournament = (props) => {
  const [teams, setTeams] = useState(4);

  // useEffect(() => {
  // getStarWarsCharacter();
  // }, [teams]);

  const allTeams = new Array(teams);

  const teamsFields = allTeams.fill(
    <div>
      <label>Team #:</label>
      <input />
    </div>
  );

  return (
    <div>
      <h1>Create Tournament component</h1>
      {teamsFields}
    </div>
  );
};

export default CreateTournament;
