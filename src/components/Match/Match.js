import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Match.css";

const Match = (props) => {
  return (
    <div className="match-content">
      <div>
        {props.team1name} VS {props.team2name}
      </div>
      <div>
        <button>Edit date</button>
        <button>Edit time</button>
      </div>
    </div>
  );
};

export default Match;
