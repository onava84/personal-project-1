import React, { useState, useEffect } from "react";
import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DateTimeSelect from "../DateTimeSelect/DateTimeSelect";
import RefereeSelect from "../RefereeSelect/RefereeSelect";
import FieldsSelect from "../Fields/FieldsSelect";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const ScheduleGameButton = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const saveAndCloseModal = () => {
    props.saveAndClose();
    props.resetDate();
    handleClose();
  };

  const clickClose = () => {
    handleClose();
  };

  console.log(props.dbSelectedDate);

  const scheduleModal = (
    <Box sx={style}>
      <Box>
        <DateTimeSelect
          defaultDate={props.selectedDate}
          setSelectedDate={props.setSelectedDate}
          open={open}
          dbSelectedDate={props.dbSelectedDate}
        />
        <RefereeSelect
          refereeSelection={props.setSelectedReferee}
          tournamentId={props.tournamentId}
          defaultReferee={props.selectedReferee}
        />
        <FieldsSelect
          fieldSelection={props.setSelectedField}
          tournamentId={props.tournamentId}
          defaultField={props.selectedField}
        />
      </Box>
      <Box mt={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={clickClose}
          disableElevation
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={saveAndCloseModal}
          disableElevation
        >
          Save
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Button onClick={handleOpen} color="secondary" variant="contained">
        Schedule Game
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{scheduleModal}</Box>
      </Modal>
    </Box>
  );
};

export default ScheduleGameButton;
