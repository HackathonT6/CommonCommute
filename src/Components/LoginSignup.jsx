import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AppContext from "../Context/AppContext";
import ModalNav from "./ModalNav";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [signupEmail, setSignupEmail] = React.useState("");
  const [signupPassword, setSignupPassword] = React.useState("");
  const [signupFirstName, setSignupFirstName] = React.useState("");
  const [signupLastName, setSignupLastName] = React.useState("");
  const [signupTelNumber, setSignupTelNumber] = React.useState("");
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [passwordTwo, setPasswordTwo] = React.useState("");

  const appContext = React.useContext(AppContext);
  const { state, setState, register, login } = appContext;
  const { closeUser } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setState({ ...state, formSelect: true });
  };

  const handleSignupEmail = (e) => {
    setSignupEmail(e.target.value);
  };

  const handleSignupPassword = (e) => {
    setSignupPassword(e.target.value);
  };

  const handleSignupFirstName = (e) => {
    setSignupFirstName(e.target.value);
  };

  const handleSignupLastName = (e) => {
    setSignupLastName(e.target.value);
  };

  const handleSignupTelNumber = (e) => {
    setSignupTelNumber(e.target.value);
  };

  const handleLoginEmail = (e) => {
    setLoginEmail(e.target.value);
  };

  const handleLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  };

  const handleVerifyLoginPassword = (e) => {
    setPasswordTwo(e.target.value);
  };

  const handleSignupSubmit = async () => {
    const formObject = {
      email: signupEmail,
      password: signupPassword,
      firstname: signupFirstName,
      lastname: signupLastName,
      phonenumber: signupTelNumber,
    };
    try {
      await register(formObject);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = React.useCallback(() => {
    (async () => {
      const loginObject = {
        email: loginEmail,
        password: loginPassword,
      };
      try {
        await login(loginObject);
        closeUser();
      } catch (err) {
        // Error response should be coming from useUser
      }
    })();
  }, [login, loginEmail, loginPassword]);

  return (
    <div>
      <Button
        id="appButton"
        variant="contained"
        color="success"
        onClick={handleClickOpen}
      >
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <ModalNav />
        {!state["formSelect"] ? (
          <>
            <DialogTitle>Sign-Up</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="emailEntry"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                onChange={handleSignupEmail}
                value={signupEmail}
              />
              <TextField
                margin="dense"
                id="pwdFirst"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={handleSignupPassword}
                value={signupPassword}
              />
              <TextField
                margin="dense"
                id="pwdSecond"
                label="Verify Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={handleVerifyLoginPassword}
                value={passwordTwo}
                error={signupPassword !== passwordTwo}
                helperText={
                  signupPassword !== passwordTwo
                    ? "Passwords do not match."
                    : null
                }
              />
              <TextField
                margin="dense"
                id="firstName"
                label="First Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleSignupFirstName}
                value={signupFirstName}
              />
              <TextField
                margin="dense"
                id="lastName"
                label="Last Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleSignupLastName}
                value={signupLastName}
              />
              <TextField
                margin="dense"
                id="telNumber"
                label="Telephone Number"
                type="tel"
                fullWidth
                variant="standard"
                onChange={handleSignupTelNumber}
                value={signupTelNumber}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} id="appButton">
                Cancel
              </Button>
              <Button
                id="appButton"
                onClick={handleSignupSubmit}
                disabled={signupPassword !== passwordTwo}
              >
                Create Account
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="emailEntry"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                onChange={handleLoginEmail}
                value={loginEmail}
              />
              <TextField
                margin="dense"
                id="pwdFirst"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={handleLoginPassword}
                value={loginPassword}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleLogin} id="appButton">
                Login
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}

// Old Signin
// setState((prev) => ({
//   ...prev,
//   userToken: response.data.token,
//   userInfo: response.data.userInfo,
//   userSaved: response.data.userInfo.savedPets,
//   userFostered: response.data.userInfo.fosteredPets,
//   userAdopted: response.data.userInfo.adoptedPets,
//   isLoggedIn: true,
// }));
// const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
// const userCookieObject = {
//   userToken: response.data.token,
//   userId: response.data.userInfo.userId
//     ? response.data.userInfo.userId
//     : response.data.userInfo._id,
//   userInfo: response.data.userInfo,
//   expiresIn: inOneHour,
// };
// Cookies.set("userPetAdoptionCookie", JSON.stringify(userCookieObject), {
//   expires: inOneHour,
// });
// const possibleCookie = Cookies.get("currentPetsCookie");
// if (possibleCookie) {
//   const petDifference = state.petsAvailable - possibleCookie;
//   if (petDifference > 0) {
//     setState((prev) => ({ ...prev, anyNewPets: petDifference }));
//   }
// }
// Cookies.set("currentPetsCookie", JSON.stringify(state.petsAvailable));

// Old Register

// alert(`${response.data.message}!`);
// const newUserObject = response.data.userInfo;
// This will be used for auto-login?
// setState((prev) => ({
//   ...prev,
//   userToken: response.data.token,
//   userInfo: response.data.userInfo,
//   userSaved: response.data.userInfo.savedPets,
//   userFostered: response.data.userInfo.fosteredPets,
//   userAdopted: response.data.userInfo.adoptedPets,
//   isLoggedIn: true,
// }));
