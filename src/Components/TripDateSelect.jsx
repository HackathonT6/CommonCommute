import React from "react";
import DateAdapter from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
// import {LocalizationProvider, DesktopDatePicker, DateAdapter } from "@mui/lab"
import { Typography, Box, TextField } from "@mui/material";

const TripDateSelect = (props) => {
  const { startDate, endDate, setFormObject } = props;

  const handleStartChange = (newValue) => {
    setFormObject((prev) => ({ ...prev, startDate: newValue }));
  };
  const handleEndChange = (newValue) => {
    setFormObject((prev) => ({ ...prev, endDate: newValue }));
  };

  return (
    <>
      <Typography align="center" variant="h5" gutterBottom>
        Please let us know the dates you will be available
      </Typography>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Box sx={{ width: "100%" }}>
          <MobileDatePicker
            label="I am available from"
            inputFormat="MM/dd/yyyy"
            value={startDate}
            onChange={handleStartChange}
            renderInput={(params) => <TextField {...params} sx={{ m: 1 }} />}
          />
          <MobileDatePicker
            label="I am available until"
            inputFormat="MM/dd/yyyy"
            value={endDate}
            onChange={handleEndChange}
            renderInput={(params) => <TextField {...params} sx={{ m: 1 }} />}
          />
        </Box>
      </LocalizationProvider>
    </>
  );
};

export default TripDateSelect;
