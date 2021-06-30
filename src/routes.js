import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateTournament from "./components/CreateTournament/CreateTournament";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/create-tournament" component={CreateTournament} />
  </Switch>
);
