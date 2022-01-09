import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AppContext from "../Context/AppContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = (props) => {
  const appContext = React.useContext(AppContext);
  const { hideToast, openToast } = appContext;
  const { toastText, severity, xaxis, yaxis } = props;
  // Severity types include warning, error, info & success
  return (
    <>
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={hideToast}
        anchorOrigin={{ vertical: yaxis, horizontal: xaxis }}
      >
        <Alert onClose={hideToast} severity={severity} sx={{ width: "100%" }}>
          {toastText}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Toast;
