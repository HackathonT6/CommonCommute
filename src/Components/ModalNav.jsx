import Button from "@mui/material/Button";
import GroupsIcon from "@mui/icons-material/Groups";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import React from "react";
import AppContext from "../Context/AppContext";

const ModalNav = () => {
  const appContext = React.useContext(AppContext);

  const { state, setState } = appContext;

  const handleModalFormSelect = (e) => {
    e.target.name === "Login"
      ? setState({ ...state, formSelect: true })
      : setState({ ...state, formSelect: false });
  };
  return (
    <div className="modal-menu">
      <Button
        id="appButton"
        variant="contained"
        color="success"
        size="small"
        endIcon={<GroupsIcon />}
        sx={{ m: 1 }}
        name="Login"
        onClick={handleModalFormSelect}
      >
        Login
      </Button>
      <Button
        id="appButton"
        variant="contained"
        color="success"
        size="small"
        endIcon={<ContactMailIcon />}
        sx={{ m: 1 }}
        name="Signup"
        onClick={handleModalFormSelect}
      >
        Signup
      </Button>
    </div>
  );
};

export default ModalNav;
