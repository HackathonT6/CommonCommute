import React from "react";
import AppContext from "../Context/AppContext";

const Home = () => {
  const appContext = React.useContext(AppContext);
  const { userId, displayToast, setState } = appContext;
  const homeToast = () => {
    setState((prev) => ({ ...prev, toastText: "Homey Toast" }));
    displayToast();
  };
  return (
    <>
      <div className="page-wrapper">
        <div>Hello my Homepage</div>
        <div>Are we logged in? {userId ? "Yes" : "No"}</div>
        <div onClick={homeToast}>Click me for custom home-page toast!</div>
      </div>
    </>
  );
};

export default Home;
