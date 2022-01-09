import React from "react";

const useToast = () => {
  const [openToast, setOpenToast] = React.useState(false);

  const displayToast = () => {
    setOpenToast(true);
  };

  const hideToast = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };

  return { displayToast, hideToast, openToast };
};

export default useToast;
