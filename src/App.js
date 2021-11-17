import "./App.css";
// import routes from "./routes";
import { updateUsername, updateUserId } from "./redux/reducer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createTheme, ThemeProvider } from "@material-ui/core";
import SimpleMenu from "./components/NavBar/NavBar";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateTournament from "./components/CreateTournament/CreateTournament";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Tournament from "./components/Tournament/Tournament";
import Tournaments from "./components/Tournaments/Tournaments";
import SingleTournament from "./components/SingleTournament/SingleTournament";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import NewPasswordInput from "./components/NewPassword/NewPasswordInput";
import DashboardNavbar from "./components/NewDashboard/NewNavbar/NewNavbar";
import TournamentStats from "./components/TournamentStats/TournamentStats";
// import ResponsiveDrawer from "./components/NewDashboard/Drawer/Drawer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DC4141",
    },
    secondary: {
      main: "#294b7a",
    },
  },
  typography: {
    fontFamily: "Helvetica, Sans-Serif",
  },
  textField: {
    marginTop: 10,
    marginBottom: 10,
  },
});

function App() {
  const apodo = "Nava";
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/auth/user").then((response) => {
      dispatch(updateUsername(response.data.username));
      dispatch(updateUserId(response.data.id));
    });
  }, []);

  const prueba = "este es string";
  const paDashboard = "este string va para dashboard";
  console.log(window.location.pathname);
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="App">
          <SimpleMenu />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/create-tournament" component={CreateTournament} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/admin/tournaments/:id" component={Tournament} />
            <Route path="/tournaments/:id" component={SingleTournament} />
            <Route path="/tournaments" component={Tournaments} />
            <Route path="/reset-password-request" component={ResetPassword} />
            <Route path="/new-password/:id" component={NewPasswordInput} />
            <Route path="/tournament-table/:id" component={TournamentStats} />
          </Switch>
          {/* <DashboardNavbar /> */}
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
