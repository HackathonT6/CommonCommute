import React from "react";
import {
  Typography,
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";

const DestinationInterests = (props) => {
  const {
    museums,
    restaurants,
    parks,
    livemusic,
    festivals,
    gyms,
    setFormObject,
  } = props;

  const handleChange = (event) => {
    // setFormObject({
    //   ...props,
    //   [event.target.name]: event.target.checked,
    // });
    setFormObject((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
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
