import React from "react";
import AppContext from "../Context/AppContext";
import { TextField, MenuItem, Box, Button, Typography } from "@mui/material";
import AutoComplete from "../Components/AutoComplete";
import TripDateSelect from "../Components/TripDateSelect";
import ModeOfTransportation from "../Components/ModeOfTransportation";
import DestinationInterests from "../Components/DestinationInterests";
import { useFormik } from "formik";
import * as yup from "yup";

// const validationSchema = yup.object({
//   modeOfT: yup.string("Enter your pet type").required("Pet type is required"),
// });

const Home = () => {
  const appContext = React.useContext(AppContext);
  const { userId, displayToast, setState } = appContext;

  const homeToast = () => {
    setState((prev) => ({ ...prev, toastText: "Homey Toast" }));
    displayToast();
  };

  // const formik = useFormik({
  //   initialValues: {
  //     modeOfT: "Scooter",
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  return (
    <>
      <div className="page-wrapper">
        <div>Hello my Homepage</div>
        <div>Are we logged in? {userId ? "Yes" : "No"}</div>
        <Box sx={{ my: 3, width: "85%" }}>
          <AutoComplete />
          <TripDateSelect />
          <ModeOfTransportation />
          <DestinationInterests />
          <Button
            id="appButton"
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Submit
          </Button>
        </Box>
        <div onClick={homeToast}>Click me for custom home-page toast!</div>
      </div>
    </>
  );
};

export default Home;
