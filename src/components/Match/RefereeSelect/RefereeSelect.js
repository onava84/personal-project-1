import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";
import { SliderValueLabel, TextField } from "@mui/material";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const RefereeSelect = (props) => {
  const [referees, setReferees] = useState([]);
  const [referee, setReferee] = useState(props.defaultReferee);

  useEffect(() => {
    axios
      .get(`/api/referees?tournament_id=${props.tournamentId}`)
      .then((res) => {
        setReferees(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleChange = (event) => {
    setReferee(event.target.value);
    props.refereeSelection(event.target.value);
  };

  const refereeMapped = referees.map((referee) => {
    return (
      <MenuItem value={referee.referee_id}>{referee.referee_name}</MenuItem>
    );
  });
  console.log(props.defaultReferee);
  console.log(props.tournamentId);
  return (
    <Box mt={2}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Referee</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={referee}
          label="Referee"
          onChange={handleChange}
        >
          {refereeMapped}
        </Select>
      </FormControl>
    </Box>
  );
};

export default RefereeSelect;
