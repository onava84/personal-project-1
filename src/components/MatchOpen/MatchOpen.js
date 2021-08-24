import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, toDate, parseISO, parse } from "date-fns";
import "./MatchOpen.css";

const MatchOpen = (props) => {
  return (
    <div className="match">
      <div>
        <div className="teams-name-open">
          {props.match.team_1_name} VS {props.match.team_2_name}
        </div>
        <p className="date-open">
          Date:{" "}
          {props.match.match_date
            ? // ? format(selectedDate, "LLLL d yyyy")
              // match.match_date
              format(parseISO(props.match.match_date), "EEEE MMMM d yyyy")
            : "not defined"}
        </p>
        <p className="time-open">
          Time:{" "}
          {props.match.match_time
            ? // ? format(selectedDate, "HH:mm")
              format(parse(props.match.match_time, "HH:mm:ss", new Date()), "p")
            : "not defined"}
        </p>
      </div>
    </div>
  );
};

export default MatchOpen;
