import axios from "axios";
import React, { useState, useEffect } from "react";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    axios
      .get("/api/alltournaments")
      .then((res) => {
        setTournaments(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  console.log(tournaments);
  const tournamentsMap = tournaments.map((e, i, a) => {
    return <p key={e.tournament_id}>Un torneo</p>;
  });

  return (
    <div>
      <h1>Tournaments component</h1>
      {tournamentsMap}
    </div>
  );
};

export default Tournaments;
