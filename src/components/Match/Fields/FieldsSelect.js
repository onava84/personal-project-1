import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

const FieldsSelect = (props) => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/fields?tournament_id=${props.tournamentId}`)
      .then((res) => {
        console.log(res.data);
        console.log(res);
        setFields(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const fieldsMapped = fields.map((field) => {
    return {
      label: `${field.field_name}`,
    };
  });

  console.log(fields);
  console.log(props.tournamentId);
  console.log(fieldsMapped);
  return (
    <Box mt={2}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={fieldsMapped}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Fields" />}
      />
    </Box>
  );
};

export default FieldsSelect;
