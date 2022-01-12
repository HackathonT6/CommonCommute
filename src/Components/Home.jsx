import React from "react";
import AppContext from "../Context/AppContext";
import { TextField, MenuItem, Box, Button, Typography } from "@mui/material";
import AutoComplete from "../Components/AutoComplete";
import TripDateSelect from "../Components/TripDateSelect";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  modeOfT: yup.string("Enter your pet type").required("Pet type is required"),
});

const Home = () => {
  const appContext = React.useContext(AppContext);
  const { userId, displayToast, setState } = appContext;

  const homeToast = () => {
    setState((prev) => ({ ...prev, toastText: "Homey Toast" }));
    displayToast();
  };

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

  const formik = useFormik({
    initialValues: {
      modeOfT: "Scooter",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <div className="page-wrapper">
        <div>Hello my Homepage</div>
        <div>Are we logged in? {userId ? "Yes" : "No"}</div>
        <Box sx={{ my: 3, width: "85%" }}>
          <AutoComplete />
          <TripDateSelect />
          <Typography align="center" variant="h5" gutterBottom sx={{ mt: 1 }}>
            How do you plan to get around?
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="modeOfT"
              select
              name="modeOfT"
              label="Mode of Transport"
              value={formik.values.modeOfT}
              onChange={formik.handleChange}
              error={formik.touched.modeOfT && Boolean(formik.errors.modeOfT)}
              helperText={formik.touched.modeOfT && formik.errors.modeOfT}
              sx={{ m: 1, width: "100%" }}
            >
              {modeOfTArray.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              id="appButton"
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
        <div onClick={homeToast}>Click me for custom home-page toast!</div>
      </div>
    </>
  );
};

export default Home;
