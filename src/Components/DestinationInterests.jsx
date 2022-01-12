import React from "react";
import {
  Typography,
  Box,
  TextField,
  Checkbox,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";

const DestinationInterests = () => {
  const [state, setState] = React.useState({
    museums: false,
    restaurants: false,
    parks: false,
    livemusic: false,
    festivals: false,
    gyms: false,
  });
  const { museums, restaurants, parks, livemusic, festivals, gyms } = state;

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <Typography align="center" variant="h5" gutterBottom>
        What sort of places would you like know about?
      </Typography>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Indoor</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={museums}
                onChange={handleChange}
                name="museums"
              />
            }
            label="Museums"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={restaurants}
                onChange={handleChange}
                name="restaurants"
              />
            }
            label="Restaurants"
          />
          <FormControlLabel
            control={
              <Checkbox checked={gyms} onChange={handleChange} name="gyms" />
            }
            label="Gyms"
          />
        </FormControl>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Outdoor</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={livemusic}
                onChange={handleChange}
                name="livemusic"
              />
            }
            label="Live Music"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={festivals}
                onChange={handleChange}
                name="festivals"
              />
            }
            label="Festivals"
          />
          <FormControlLabel
            control={
              <Checkbox checked={parks} onChange={handleChange} name="parks" />
            }
            label="Parks"
          />
        </FormControl>
      </Box>
    </>
  );
};

export default DestinationInterests;
