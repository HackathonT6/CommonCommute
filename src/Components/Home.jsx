import React from "react";
import AppContext from "../Context/AppContext";
import { Box, Button, Typography } from "@mui/material";
import AutoComplete from "../Components/AutoComplete";
import TripDateSelect from "../Components/TripDateSelect";
import ModeOfTransportation from "../Components/ModeOfTransportation";
import DestinationInterests from "../Components/DestinationInterests";
// import { useFormik } from "formik";
// import * as yup from "yup";

// const validationSchema = yup.object({
//   modeOfT: yup.string("Enter your pet type").required("Pet type is required"),
// });

const Home = () => {
  const appContext = React.useContext(AppContext);
  const { userId, displayToast, setState } = appContext;
  const [formObject, setFormObject] = React.useState({
    destinationSelection: null,
    startDate: new Date("2021-12-16T21:11:54"),
    endDate: new Date("2021-12-25T21:11:54"),
    modeTransportation: "Scooter",
    museums: false,
    restaurants: false,
    parks: false,
    livemusic: false,
    festivals: false,
    gyms: false,
  });

  const homeToast = () => {
    setState((prev) => ({ ...prev, toastText: "Homey Toast" }));
    displayToast();
  };

  const handleSubmit = () => {
    alert(JSON.stringify(formObject));
  };

  return (
    <>
      <div className="page-wrapper">
        <div>Hello my Homepage</div>
        <Box sx={{ my: 3, width: "85%" }}>
          <AutoComplete
            destinationSelection={formObject.destinationSelection}
            setFormObject={setFormObject}
          />
          <TripDateSelect
            startDate={formObject.startDate}
            endDate={formObject.endDate}
            setFormObject={setFormObject}
          />
          <ModeOfTransportation
            modeTransportation={formObject.modeTransportation}
            setFormObject={setFormObject}
          />
          <DestinationInterests
            state={
              (formObject.museums,
              formObject.restaurants,
              formObject.parks,
              formObject.livemusic,
              formObject.festivals,
              formObject.gyms)
            }
            setFormObject={setFormObject}
          />
          <Button
            id="appButton"
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleSubmit}
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
