import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Box } from "@mui/system";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TimePicker from "@mui/lab/TimePicker";
import TextField from "@mui/material/TextField";

const DateTimeSelect = (props) => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  const handleChange = (e) => {
    setSelectedDateTime(e);
    props.setSelectedDate(e);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
      <Box fullWidth>
        <DesktopDatePicker
          disablePast
          fullWidth
          label="Date"
          inputFormat="MM/dd/yyyy"
          value={selectedDateTime}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
      <Box>
        <TimePicker
          disablePast
          fullWidth
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
