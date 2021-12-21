import "./App.css";
// import routes from "./routes";
import { updateUsername, updateUserId } from "./redux/reducer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createTheme, ThemeProvider } from "@material-ui/core";
// import SimpleMenu from "./components/NavBar/NavBar";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
// import CreateTournament from "./components/CreateTournament/CreateTournament";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Tournament from "./components/Tournament/Tournament";
import Tournaments from "./components/Tournaments/Tournaments";
import SingleTournament from "./components/SingleTournament/SingleTournament";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import NewPasswordInput from "./components/NewPassword/NewPasswordInput";
import TournamentStats from "./components/TournamentStats/TournamentStats";
import routes from "./routes";
import CreateTournament from "./components/CreateTournament/CreateTournament";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar.js/Navbar";

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

const App = () => {
  const [userId, setUserId] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const dispatch = useDispatch();
  // console.log(userId);
  useEffect(() => {
    axios.get("/auth/user").then((response) => {
      // console.log(response);
      dispatch(updateUserId(response.data.id));
      setIsPending(false);
      dispatch(updateUsername(response.data.username));
      // console.log(response.data.id);
      setUserId(response.data.id);
    });
  }, []);
  const inStore = useSelector((store) => store.userId);
  console.log(inStore);
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="App">
          <Navbar />
          {!isPending ? (
            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route path="/dashboard" component={Dashboard} /> */}

              <ProtectedRoute path="/dashboard">
                <Dashboard />
              </ProtectedRoute>

              {/* <Route path="/create-tournament" component={CreateTournament} /> */}
              <ProtectedRoute path="/create-tournament">
                <CreateTournament />
              </ProtectedRoute>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              {/* <Route path="/admin/tournaments/:id" component={Tournament} /> */}
              <ProtectedRoute exact path="/admin/tournaments/:id">
                <Tournament />
              </ProtectedRoute>
              <Route path="/tournaments/:id" component={SingleTournament} />
              <Route path="/tournaments" component={Tournaments} />
              <Route path="/reset-password-request" component={ResetPassword} />
              <Route path="/new-password/:id" component={NewPasswordInput} />
              <Route path="/tournament-table/:id" component={TournamentStats} />
            </Switch>
          ) : null}
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
  // }
};

export default App;
