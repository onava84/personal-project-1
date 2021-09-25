import React from "react";
// import axios from "axios";
import { format, parseISO, parse } from "date-fns";
import "./MatchOpen.css";

const MatchOpen = (props) => {
  return (
    <div
      className={
        props.match.team_1_name === "Rest" || props.match.team_2_name === "Rest"
          ? "match-rest"
          : "match"
      }
    >
      {props.match.team_1_name === "Rest" ? (
        <div className="teams-name-open">
          {`${props.match.team_2_name} descansa`}
        </div>
      ) : props.match.team_2_name === "Rest" ? (
        <div className="teams-name-open">
          {`${props.match.team_1_name} descansa`}
        </div>
      ) : (
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
                format(
                  parse(props.match.match_time, "HH:mm:ss", new Date()),
                  "p"
                )
              : "not defined"}
          </p>
        </div>
      )}
      {/* <div>
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
      </div> */}
    </div>
  );
};

export default MatchOpen;
