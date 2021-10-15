import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Box } from "@mui/system";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TimePicker from "@mui/lab/TimePicker";
import TextField from "@mui/material/TextField";

const DateTimeSelect = (props) => {
  const [selectedDateTime, setSelectedDateTime] = useState(props.defaultDate);

  const handleChange = (e) => {
    setSelectedDateTime(e);
    props.setSelectedDate(e);
  };

  console.log(props.defaultDate);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
      <Box mt={2}>
        <DesktopDatePicker
          disablePast
          label="Date"
          inputFormat="MM/dd/yyyy"
          value={selectedDateTime}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
      <Box mt={2}>
        <TimePicker
          label="Time"
          value={selectedDateTime}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateTimeSelect;
