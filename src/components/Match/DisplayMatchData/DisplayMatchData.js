import React from "react";
import { format, addDays, parseISO, parse } from "date-fns";

const DisplayMatchData = (props) => {
  return (
    <div>
      <p className="date">
        Date:{" "}
        {props.match.match_date
          ? format(parseISO(props.match.match_date), "EEEE MMMM d yyyy")
          : "Not defined"}
      </p>
      <p className="time">
        Time:{" "}
        {props.match.match_date
          ? format(parseISO(props.match.match_date), "p")
          : "Not defined"}
      </p>
      <p className="time">
        Referee:{" "}
        {props.match.referee_name ? props.match.referee_name : "Not defined"}
      </p>
      <p className="time">
        Field: {props.match.field_name ? props.match.field_name : "Not defined"}
      </p>
    </div>
  );
};

export default DisplayMatchData;
