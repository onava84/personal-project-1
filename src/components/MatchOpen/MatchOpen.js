import React from "react";
// import axios from "axios";
import { format, parseISO, parse } from "date-fns";
import "./MatchOpen.css";
// import axios from "axios";

const MatchOpen = (props) => {
  // const [referee, setReferee] = useState("Not defined");
  // const [field, setField] = useState("Not defined");

  // useEffect(() => {
  //   if (props.match.referee_id !== null) {
  //     console.log(props.match.referee_id);
  //     axios.get(`/api/match-referee/${props.match.referee_id}`).then((res) => {
  //       console.log(res.data[0]);
  //       setReferee(res.data[0].referee_name);
  //     });
  //   }
  // }, []);

  console.log(new Date(props.match.match_date));

  // console.log(new Date());
  // console.log(objeto);

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
              : "Not defined"}
          </p>
          <p className="time-open">
            Time:{" "}
            {props.match.match_date
              ? // ? format(selectedDate, "HH:mm")
                format(parseISO(props.match.match_date), "p")
              : "Not defined"}
          </p>
          {/* <p className="time-open">
            Field:{" "}
            {props.match.field_name !== null
              ? props.match.field_name
              : "Not defined"}
          </p>
          <p className="time-open">
            Referee:{" "}
            {props.match.referee_name !== null
              ? props.match.referee_name
              : "Not defined"}
          </p> */}
        </div>
      )}
    </div>
  );
};

export default MatchOpen;
