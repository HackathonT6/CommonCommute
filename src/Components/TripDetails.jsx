import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TripDetails = () => {
  let navigate = useNavigate();

  const backHome = () => {
    navigate("/");
  };

  return (
    <Box className="page-wrapper">
      Hello, I'm the trip details component
      <Button
        variant="contained"
        color="success"
        onClick={backHome}
        sx={{ m: 2 }}
      >
        Back
      </Button>
    </Box>
  );
};

export default TripDetails;
