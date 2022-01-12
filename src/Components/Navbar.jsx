import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import together from "../img/togetherv2.png";
import LoginSignup from "../Components/LoginSignup";
import AppContext from "../Context/AppContext";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    secondary: {
      main: "#C6D8D3",
      contrastText: "#fff ",
    },
  },
});

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [avatarAlt, setAvatarAlt] = React.useState(" ");
  const divRef = React.useRef();
  const appContext = React.useContext(AppContext);
  const { logout, userId, currentUser } = appContext;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = () => {
    setAnchorElUser(divRef.current);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    { label: "Profile", url: "/profile" },
    { label: "Logout", url: "" },
    { label: "Admin Panel", url: "/admin" },
  ];

  React.useEffect(() => {
    setAnchorElUser(divRef.current);
  }, [divRef]);

  React.useEffect(() => {
    if (userId) {
      console.log(userId);
      console.log("Make a toast pop up at this point");
      console.log("currrent user NAv: ", currentUser);
      setAvatarAlt(
        `${currentUser.firstname} ${currentUser.lastname}`.toUpperCase()
      );
    }
  }, [currentUser]);

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <AppBar position="static" color="secondary">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <img src={together} className="together" alt="Magic" />
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <Link to="" style={{ textDecoration: "none" }}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Home</Typography>
                    </MenuItem>
                  </Link>
                  {userId ? (
                    <>
                      <Link to="chat" style={{ textDecoration: "none" }}>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">Chat</Typography>
                        </MenuItem>
                      </Link>
                    </>
                  ) : null}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                <img src={together} className="together" alt="Magic" />
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Link to="" style={{ textDecoration: "none" }}>
                  <Button
                    id="appButton"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, mx: 1, color: "white", display: "block" }}
                    variant="contained"
                    color="success"
                  >
                    Home
                  </Button>
                </Link>

                {userId ? (
                  <>
                    <Link to="chat" style={{ textDecoration: "none" }}>
                      <Button
                        id="appButton"
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, mx: 1, color: "white", display: "block" }}
                        variant="contained"
                        color="success"
                      >
                        Chat
                      </Button>
                    </Link>
                  </>
                ) : null}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                {userId ? (
                  <>
                    <Tooltip title="Open settings">
                      <IconButton
                        onClick={handleOpenUserMenu}
                        sx={{ p: 0 }}
                        ref={divRef}
                      >
                        <Avatar
                          alt={avatarAlt}
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem
                          key={setting.label}
                          onClick={handleCloseNavMenu}
                          id={setting.label}
                        >
                          <Link
                            to={setting.url}
                            style={{ textDecoration: "none" }}
                          >
                            <Typography
                              textAlign="center"
                              onClick={
                                setting.label === "Logout" ? logout : null
                              }
                            >
                              {setting.label}
                            </Typography>
                          </Link>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <>
                    <LoginSignup closeUser={handleCloseUserMenu} />
                  </>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
};
export default Navbar;
