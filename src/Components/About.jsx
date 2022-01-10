import React from "react";
import AppContext from "../Context/AppContext";

const About = () => {
  const appContext = React.useContext(AppContext);
  const { state, userId } = appContext;
  return (
    <>
      <div className="page-wrapper">
        <div>Hello my About Page</div>
        <div>Are we logged in? {userId ? "Yes" : "No"}</div>
      </div>
    </>
  );
};

export default About;
