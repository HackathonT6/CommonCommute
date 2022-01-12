import React from "react";
import { Typography, Box, TextField, MenuItem } from "@mui/material";

const ModeOfTransporation = () => {
  const [modeTransportation, setModeTransportation] = React.useState("Scooter");
  const modeOfTArray = [
    {
      value: "Scooter",
      label: "Scooter",
    },
    {
      value: "Bus",
      label: "Bus",
    },
    {
      value: "Train",
      label: "Train",
    },
    {
      value: "Car",
      label: "Car",
    },
    {
      value: "Taxi",
      label: "Taxi",
    },
  ];
  const handleModeChange = (e) => {
    setModeTransportation(e.target.value);
  };
  return (
    <>
      <Typography align="center" variant="h5" gutterBottom sx={{ mt: 1 }}>
        How do you plan to get around?
      </Typography>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <TextField
          id="modeOfT"
          select
          name="modeOfT"
          label="Mode of Transport"
          value={modeTransportation}
          onChange={handleModeChange}
          sx={{ m: 1, width: "100%" }}
        >
          {modeOfTArray.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </>
  );
};

export default ModeOfTransporation;
