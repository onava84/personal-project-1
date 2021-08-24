import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { clearReduxState } from "../../redux/reducer";
// import { Link } from "@material-ui/core";
import { Link } from "react-router-dom";

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

export default function SimpleMenu() {
  const classes = useStyles();
  const username = useSelector((reduxState) => reduxState.username);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    axios.delete("/auth/logout").then((response) => {
      dispatch(clearReduxState());
      handleClose();
      history.push("/login");
    });
  };

  const mobileGuest = (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="primary"
        variant="contained"
      >
        Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/">
          Home
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={Link}
          to="/search-tournament"
        >
          Search tournament
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/register">
          Register
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/login">
          Login
        </MenuItem>
      </Menu>
    </div>
  );

  const mobileLoggedIn = (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="primary"
        variant="contained"
      >
        Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/">
          Home
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/dashboard">
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={Link}
          to="/create-tournament"
        >
          Create tournament
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/tournaments">
          Search tournament
        </MenuItem>
        <MenuItem onClick={() => handleLogOut()}>Logout</MenuItem>
      </Menu>
    </div>
  );

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
          <div className={classes.sectionMobile}>
            {!username ? mobileGuest : mobileLoggedIn}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
