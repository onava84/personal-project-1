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
import TournamentStats from "./components/TournamentStats/TournamentStats";

export default (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/dashboard">
      <Dashboard />
    </Route>
    <Route path="/create-tournament">
      <CreateTournament />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/admin/tournaments/:id">
      <Tournament />
    </Route>
    <Route path="/tournaments/:id">
      <SingleTournament />
    </Route>
    <Route path="/tournaments">
      <Tournaments />
    </Route>
    <Route path="/reset-password-request">
      <ResetPassword />
    </Route>
    <Route path="/new-password/:id">
      <NewPasswordInput />
    </Route>
    <Route path="/tournament-table/:id">
      <TournamentStats />
    </Route>
  </Switch>
);
