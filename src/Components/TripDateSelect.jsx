import React from "react";
import DateAdapter from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
// import {LocalizationProvider, DesktopDatePicker, DateAdapter } from "@mui/lab"
import { Typography, Box, TextField } from "@mui/material";

const TripDateSelect = () => {
  const [startDate, setStartDate] = React.useState(
    new Date("2021-12-16T21:11:54")
  );
  const [endDate, setEndDate] = React.useState(new Date("2021-12-25T21:11:54"));

  const handleStartChange = (newValue) => {
    setStartDate(newValue);
  };
  const handleEndChange = (newValue) => {
    setEndDate(newValue);
  };
  return (
    <>
      <Typography align="center" variant="h5" gutterBottom>
        Please let us know the dates you will be available
      </Typography>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Box sx={{ m: 1 }} component="span">
          <MobileDatePicker
            label="I am available from"
            inputFormat="MM/dd/yyyy"
            value={startDate}
            onChange={handleStartChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <Box sx={{ m: 1 }} component="span">
          <MobileDatePicker
            label="I am available until"
            inputFormat="MM/dd/yyyy"
            value={endDate}
            onChange={handleEndChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </LocalizationProvider>
    </>
  );
};

export default TripDateSelect;
