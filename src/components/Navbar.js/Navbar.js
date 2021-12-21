import React from "react";
import { Box, Typography } from "@mui/material";
import "./Navbar.css";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";
import { clearReduxState } from "../../redux/reducer";

const Navbar = () => {
  const auth = useSelector((store) => store.userId);
  const dispatch = useDispatch();
  let history = useHistory();

  // console.log(auth);
  const Logout = () => {
    axios.delete("/auth/logout").then((res) => {
      dispatch(clearReduxState());
      history.push("/login");
    });
  };

  // const handleLogout = () => {
  //   axios.delete("/api/logout").then((res) => {
  //     dispatch(clearReduxState());
  //     history.push("/login");
  //   });
  // };

  return (
    <Box sx={{ backgroundColor: "#294b7a" }}>
      <Container>
        <Box
          sx={{
            // height: "60px",
            paddingTop: "15px",
            paddingBottom: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <Typography variant="h4">Soccer Schedule</Typography>
          <ul className="menu-items">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/create-tournament">Create Tournament</Link>
            </li>
            <li>
              <Link to="/tournaments">Search Tournament</Link>
            </li>
            <li className={auth ? "not-show" : ""}>
              <Link to="/login">Login</Link>
            </li>
            <li className={auth ? "" : "not-show"}>
              <p className="logout" onClick={Logout}>
                Logout
              </p>
            </li>
          </ul>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
