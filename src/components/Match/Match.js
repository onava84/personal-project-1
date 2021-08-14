import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Match.css";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core";
import { format, toDate, parseISO, parse } from "date-fns";

const useStyles = makeStyles({
  btn: {
    display: "none",
  },
});

const Match = (props) => {
  const [editOpen, setEditOpen] = useState(false);
  const [match, setMatch] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [edit, setEdit] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`/api/matches/${props.match.match_id}`)
      .then((res) => {
        const { data: matchData } = res;
        setMatch(matchData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [edit]);

  const clickHandler = () => {
    setEditOpen(!editOpen);
  };

  const handleSaveClick = () => {
    const updatedMatch = {
      match_date: format(selectedDate, "yyyy-MM-dd"),
      match_time: format(selectedDate, "HH:mm:ss"),
    };
    axios
      .put(`/api/matches/${match.match_id}`, updatedMatch)
      .then((res) => {
        console.log("se editaron la fecha y el horario");
        // if (match.match_date !== null || match.match_time !== null) {
        setEdit(!edit);
        //
        clickHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="match">
      <div>
        {props.match.team_1_name} VS {props.match.team_2_name}
        <p>
          Date:{" "}
          {match.match_date
            ? // ? format(selectedDate, "LLLL d yyyy")
              // match.match_date
              format(parseISO(match.match_date), "EEEE MMMM d yyyy")
            : "not defined"}
        </p>
        <p>
          Time:{" "}
          {match.match_time
            ? // ? format(selectedDate, "HH:mm")
              format(parse(match.match_time, "HH:mm:ss", new Date()), "p")
            : "not defined"}
        </p>
      </div>
      <div>
        {editOpen ? (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disablePast
              value={selectedDate}
              onChange={setSelectedDate}
              label="Select Date"
            />
            <TimePicker
              value={selectedDate}
              onChange={setSelectedDate}
              label="Select Time"
            />
          </MuiPickersUtilsProvider>
        ) : (
          ""
        )}
        <Button
          disableElevation
          variant="contained"
          color="primary"
          onClick={(e) => clickHandler()}
          startIcon={!editOpen ? <EditIcon /> : null}
          // className={editOpen ? "cancel" : ""}
        >
          {editOpen ? "Cancel" : "Edit Date & Time"}
        </Button>
        <Button
          className={!editOpen ? classes.btn : ""}
          onClick={(e) => handleSaveClick()}
          variant="contained"
          color="secondary"
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Match;

/////////////////////////////

// const Match = (props) => {
//   const [editOpen, setEditOpen] = useState(false);
//   const [match, setMatch] = useState({});

//   useEffect(() => {
//     axios
//       .get(`/api/matches/${props.match.match_id}`)
//       .then((res) => {
//         const { data: matchData } = res;
//         setMatch(matchData);
//         console.log(matchData.match_date);
//         console.log(matchData.match_time);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }, []);

//   const clickHandler = () => {
//     setEditOpen(!editOpen);
//   };

//   const handleDateChange = (date) => {
//     setMatch((prevState) => {
//       return { ...prevState, match_date: date };
//     });
//   };

//   const handleTimeChange = (time) => {
//     setMatch((prevState) => {
//       return { ...prevState, match_time: time };
//     });
//   };

//   // const handleSaveClick = (date) => {
//   //   let formatedDate = moment(date).format("YYYY-MM-DD");
//   //   let formatedTime = moment(date).format("HH:mm");

//   //   const updatedMatch = {
//   //     match_date: formatedDate,
//   //     match_time: formatedTime,
//   //   };
//   //   axios
//   //     .put(`/api/matches/${match.match_id}`, updatedMatch)
//   //     .then((res) => {
//   //       console.log("se editaron la fecha y el horario");
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // };

//   const formatDate = (match_date) => {
//     var date = moment(match_date).format("DD-MM-YYYY");
//     return date;
//   };

//   const formatTime = (match_time) => {
//     var time = moment(match_time).format("HH:mm:ss");
//     return time;
//   };

//   console.log(match);

//   return (
//     <div className="match">
//       <div>
//         {props.match.team_1_name} VS {props.match.team_2_name}
//         <p>
//           Date:{" "}
//           {match.match_date ? formatDate(match.match_date) : <p>not defined</p>}
//         </p>
//         <p>
//           Time:{" "}
//           {match.match_time ? formatTime(match.match_time) : <p>not defined</p>}
//         </p>
//       </div>
//       <div>
//         {editOpen ? (
//           <MuiPickersUtilsProvider utils={MomentUtils}>
//             <DatePicker
//               // format={"YYYY/MM/DD"}
//               disablePast
//               value={match.match_date}
//               onChange={handleDateChange}
//               label="Select Date"
//             />
//             <TimePicker
//               value={match.match_time}
//               onChange={handleTimeChange}
//               label="Select Time"
//             />
//           </MuiPickersUtilsProvider>
//         ) : (
//           ""
//         )}
//         <button
//           className={editOpen ? "cancel" : ""}
//           onClick={(e) => clickHandler()}
//         >
//           {editOpen ? "Cancel" : "EDIT DATE & TIME"}
//         </button>
//         <button
//           className={editOpen ? "" : "save-close"}
//           // onClick={(e) => handleSaveClick(match.match_id)}
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Match;
