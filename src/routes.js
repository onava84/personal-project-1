import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateTournament from "./components/CreateTournament/CreateTournament";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/create-tournament" component={CreateTournament} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
  </Switch>
);
