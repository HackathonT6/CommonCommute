import React from "react";
import { Box, Button, Typography, IconButton, Tooltip } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserModal from "../Components/UserModal";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import axios from "axios";
import AdbRoundedIcon from "@mui/icons-material/AdbRounded";
import BlenderRoundedIcon from "@mui/icons-material/BlenderRounded";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";

const TripDetails = () => {
  const [searchParams] = useSearchParams();
  const tripObject = Object.fromEntries([...searchParams]);
  let navigate = useNavigate();
  const mapElement = React.useRef();
  const [mapLongitude, setMapLongitude] = React.useState(tripObject.lon);
  const [mapLatitude, setMapLatitude] = React.useState(tripObject.lat);
  const [mapZoom, setMapZoom] = React.useState(13);
  const [map, setMap] = React.useState({});
  const [museums, setMuseums] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    (async () => {
      const lon = tripObject.lon;
      const lat = tripObject.lat;
      try {
        const response = await axios.get(
          `https://api.tomtom.com/search/2/search/museums.json?lat=${lat}&lon=${lon}&minFuzzyLevel=1&maxFuzzyLevel=2&view=Unified&relatedPois=off&key=g1gbw2nKiP2IVIli2AsKNICCYL2qIoc5`
        );
        console.log(response.data.results[4].poi.name);
        setMuseums(response.data.results);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);

  const increaseZoom = () => {
    if (mapZoom < 1) {
      setMapZoom(mapZoom + 1);
    }
  };

  const decreaseZoom = () => {
    if (mapZoom > 1) {
      setMapZoom(mapZoom - 1);
    }
  };

  const updateMap = () => {
    map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
    map.setZoom(mapZoom);
  };

  const backHome = () => {
    navigate("/");
  };

  React.useEffect(() => {
    let map = tt.map({
      key: "g1gbw2nKiP2IVIli2AsKNICCYL2qIoc5",
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
    });
    setMap(map);
    return () => map.remove();
  }, []);

  return (
    <Box className="page-wrapper">
      <Box component="span" sx={{ m: 2 }}>
        <Typography align="center" variant="h5">
          We hope you have a great trip to {tripObject.freeform}
          {/* <Button
            variant="contained"
            color="success"
            onClick={backHome}
            sx={{ mx: 5 }}
          >
            Back
          </Button> */}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Box>
          <Box
            ref={mapElement}
            className="mapDiv"
            sx={{ width: 500, height: 500 }}
            className="border-2 border-dark"
          ></Box>
        </Box>
        <Box
          sx={{
            mx: 1,
            p: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            align="center"
            variant="h6"
            sx={{ color: "#6500c3", m: 1 }}
          >
            We see you are mostly traveling by {tripObject.mode}
          </Typography>
          <Typography align="center" variant="h6" gutterBottom>
            Here are some recommended apps that are popular for obtaining{" "}
            {tripObject.mode + "s"} at your destination:
          </Typography>
          <Box>
            <Tooltip title="Bonanza">
              <IconButton>
                <AdbRoundedIcon
                  sx={{
                    m: 1,
                    width: 50,
                    height: 50,
                    bgcolor: "#af8fe9",
                    borderRadius: 3,
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Picardo">
              <IconButton>
                <BlenderRoundedIcon
                  sx={{
                    m: 1,
                    width: 50,
                    height: 50,
                    bgcolor: "#f47174",
                    borderRadius: 3,
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Janeway">
              <IconButton>
                <ConfirmationNumberRoundedIcon
                  sx={{
                    m: 1,
                    width: 50,
                    height: 50,
                    bgcolor: "#feefc3",
                    borderRadius: 3,
                  }}
                  alt="Ohhh"
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography align="center" variant="h6" gutterBottom>
            Your availability is from {tripObject.start} to {tripObject.end}
          </Typography>
          <Typography align="center" variant="h6" gutterBottom>
            Your points of interest include:
          </Typography>
          <Box>
            {museums.length > 0
              ? museums.map((poi) => {
                  return <div>{poi.poi.name}</div>;
                })
              : null}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography
            align="center"
            variant="h6"
            sx={{ color: "#6500c3", m: 1 }}
          >
            There are 4 users nearby!:
          </Typography>
          <Box>
            <Tooltip title="Jordan">
              <IconButton id="User1" onClick={handleOpen}>
                <AccessibilityNewIcon
                  sx={{
                    m: 1,
                    width: 50,
                    height: 50,
                    bgcolor: "#feefc3",
                    borderRadius: 3,
                  }}
                  alt="Ohhh"
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="User">
              <IconButton id="User2" onClick={handleOpen}>
                <AccessibilityNewIcon
                  sx={{
                    m: 1,
                    width: 50,
                    height: 50,
                    bgcolor: "#feefc3",
                    borderRadius: 3,
                  }}
                  alt="Ohhh"
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="User">
              <IconButton id="User3" onClick={handleOpen}>
                <AccessibilityNewIcon
                  sx={{
                    m: 1,
                    width: 50,
                    height: 50,
                    bgcolor: "#feefc3",
                    borderRadius: 3,
                  }}
                  alt="Ohhh"
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="User">
              <IconButton id="User4" onClick={handleOpen}>
                <AccessibilityNewIcon
                  sx={{
                    m: 1,
                    width: 50,
                    height: 50,
                    bgcolor: "#feefc3",
                    borderRadius: 3,
                  }}
                  alt="Ohhh"
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <UserModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default TripDetails;
