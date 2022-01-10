import React from "react";
import AppContext from "../Context/AppContext";

const Blog = () => {
  const appContext = React.useContext(AppContext);
  const { state, setState, displayToast, userId } = appContext;
  const blogToast = () => {
    setState((prev) => ({ ...prev, toastText: "A profile-related Toast" }));
    displayToast();
  };
  return (
    <>
      <div className="page-wrapper">
        <div>Welcome to this profile component!</div>
        <div>Are we logged in? {userId ? "Yes" : "No"}</div>
        <div onClick={blogToast}>
          Click me to trigger the custom toast for the profile.
        </div>
      </div>
    </>
  );
};

export default Blog;
