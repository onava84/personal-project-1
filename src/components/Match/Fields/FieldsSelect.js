import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";
import { SliderValueLabel, TextField } from "@mui/material";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const FieldSelect = (props) => {
  const [fields, setFields] = useState([]);
  const [field, setField] = useState(props.defaultField);

  useEffect(() => {
    axios
      .get(`/api/fields?tournament_id=${props.tournamentId}`)
      .then((res) => {
        setFields(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleChange = (event) => {
    setField(event.target.value);
    props.fieldSelection(event.target.value);
  };

  const fieldMapped = fields.map((field) => {
    return <MenuItem value={field.field_id}>{field.field_name}</MenuItem>;
  });

  console.log(props.tournamentId);
  console.log(props.defaultField);

  return (
    <Box mt={2}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Field</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={field}
          label="Field"
          onChange={handleChange}
        >
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
          {fieldMapped}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FieldSelect;
