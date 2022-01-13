import React from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Context/AppContext";
import { Box, Button, Typography } from "@mui/material";
import { DateTime } from "luxon";
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
    startDate: DateTime.now(),
    endDate: DateTime.now().plus({ days: 7 }),
    modeTransportation: "Scooter",
    museums: false,
    restaurants: false,
    parks: false,
    livemusic: false,
    festivals: false,
    gyms: false,
  });
  let navigate = useNavigate();

  const homeToast = () => {
    setState((prev) => ({ ...prev, toastText: "Homey Toast" }));
    displayToast();
  };

  const handleSubmit = () => {
    const formatStart = DateTime.fromISO(formObject.startDate).toFormat(
      "MM-dd-yyyy"
    );
    const formatEnd = DateTime.fromISO(formObject.endDate).toFormat(
      "MM-dd-yyyy"
    );
    navigate(
      `/trip/?lat=${formObject.destinationSelection.position.lat}&lon=${formObject.destinationSelection.position.lon}&start=${formatStart}&end=${formatEnd}&mode=${formObject.modeTransportation}&museums=${formObject.museums}&restaurants=${formObject.restaurants}&parks=${formObject.parks}&livemusic=${formObject.livemusic}&festivals=${formObject.festivals}&gyms=${formObject.gyms}&freeform=${formObject.destinationSelection.address.freeformAddress}`,
      { replace: true }
    );
    alert(JSON.stringify(formObject));
  };

  return (
    <>
      <div className="page-wrapper">
        <Typography align="center" variant="h4" gutterBottom>
          Plan your trip with us!
        </Typography>
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
            Let's do this, To-Get-Ther!
          </Button>
        </Box>
        <div onClick={homeToast}>Click me for custom home-page toast!</div>
      </div>
    </>
  );
};

export default Home;
