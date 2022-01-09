import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import useUser from "./Hooks/useUser";
import useToast from "./Hooks/useToast";
import AppContext from "./Context/AppContext";
import Toast from "./Components/Toast";

export default function App() {
  const { register, login, logout, userId } = useUser();
  const { displayToast, hideToast, openToast } = useToast();
  const [state, setState] = React.useState({
    formSelect: true,
    toastText: "",
    toastSeverity: "success",
  });
  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        register,
        login,
        logout,
        userId,
        displayToast,
        hideToast,
        openToast,
      }}
    >
      <div className="App">
        <Navbar />
        <Outlet />
        <Toast
          toastText={state.toastText}
          severity={state.toastSeverity}
          xaxis={"center"}
          yaxis={"bottom"}
        />
      </div>
    </AppContext.Provider>
  );
}
