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
    handleClose();
  };

  const cancelAndReset = () => {
    props.setSelectedDate(props.match.match_date);
    props.setSelectedField(props.match.field_id);
    props.setSelectedReferee(props.match.referee_id);
    handleClose();
  };

  const scheduleModal = (
    <Box sx={style}>
      <Box>
        <DateTimeSelect
          defaultDate={props.selectedDate}
          setSelectedDate={props.setSelectedDate}
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
          onClick={cancelAndReset}
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
        onBackdropClick={cancelAndReset}
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
