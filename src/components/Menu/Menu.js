import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearReduxState } from "../../redux/reducer";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Menu.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Box } from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
// import { Tabs, Tab } from "@material-ui/core";
// import Menu from "@material-ui/icons/Menu";
// import { MenuItem } from "@material-ui/core";
// import { alpha } from "@material-ui/core";
// import { Badge } from "@material-ui/core";
// import { More } from "@material-ui/icons";
// import { Mail } from "@material-ui/icons";
// import { Notifications } from "@material-ui/icons";
// import { AccountCircle } from "@material-ui/icons";
// import { Search } from "@material-ui/icons";
// import { Input } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
}));

const MainMenu = () => {
  const classes = useStyles();
  const username = useSelector((reduxState) => reduxState.username);
  const dispatch = useDispatch();
  let history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    axios.delete("/auth/logout").then((response) => {
      dispatch(clearReduxState());
      history.push("/login");
    });
  };

  const guestUsersDesktop = (
    <>
      <div style={{ display: "flex" }}>
        <Box mr={4}>
          <Button href="/#/" color="inherit">
            Home
          </Button>
        </Box>
        <Box mr={4}>
          <Button href="/#/register" color="inherit">
            Register
          </Button>
        </Box>
        <Box mr={4}>
          <Button href="/#/tournaments" color="inherit">
            Search tournament
          </Button>
        </Box>
        <Box mr={4}>
          <Button href="/#/login" color="inherit">
            Login
          </Button>
        </Box>
      </div>
    </>
  );

  const loggedInUsersDesktop = (
    <>
      <div style={{ display: "flex" }}>
        <Box mr={4}>
          <Button href="/#/" color="inherit">
            Home
          </Button>
        </Box>
        <Box mr={4}>
          <Button href="/#/dashboard" color="inherit">
            Dashboard
          </Button>
        </Box>
        <Box mr={4}>
          <Button href="/#/create-tournament" color="inherit">
            Create tournament
          </Button>
        </Box>
        <Box mr={4}>
          <Button href="/#/tournaments" color="inherit">
            Search tournament
          </Button>
        </Box>
        <Box mr={4}>
          <Button onClick={() => handleLogOut()} color="inherit">
            Logout
          </Button>
        </Box>
      </div>
    </>
  );

  return (
    <div>
      <div className={classes.toolbar}></div>
      <AppBar elevation={0} color="secondary" className={classes.root}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>MyTournament.online</Typography>
          <div className={classes.sectionDesktop}>
            {!username ? guestUsersDesktop : loggedInUsersDesktop}
          </div>
          <div className={classes.sectionMobile}></div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainMenu;
