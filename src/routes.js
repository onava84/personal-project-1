import React from "react";
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

export default (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/create-tournament" component={CreateTournament} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/admin/tournaments/:id" component={Tournament} />
    <Route path="/tournaments/:id" component={SingleTournament} />
    <Route path="/tournaments" component={Tournaments} />
    <Route path="/reset-password-request" component={ResetPassword} />
    <Route path="/new-password/:id" component={NewPasswordInput} />
  </Switch>
);
