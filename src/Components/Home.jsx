import React from "react";
import AppContext from "../Context/AppContext";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AutoComplete from "../Components/AutoComplete";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  destination: yup
    .string("Enter your destination")
    .required("A destination is required for us to help you."),
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
      destination: "",
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
        <Box sx={{ mt: 3 }}>
          <AutoComplete />
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
              sx={{ width: "90%" }}
            >
              {modeOfTArray.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              id="destination"
              name="destination"
              label="Destination"
              placeholder="Please search for your destination here"
              sx={{ my: 1.5, width: "90%" }}
              value={formik.values.destination}
              onChange={formik.handleChange}
              error={
                formik.touched.destination && Boolean(formik.errors.destination)
              }
              helperText={
                formik.touched.destination && formik.errors.destination
              }
            />
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
        {/* <Box sx={{ m: 2 }}>
          <AutoComplete />
        </Box> */}
      </div>
    </>
  );
};

export default Home;
