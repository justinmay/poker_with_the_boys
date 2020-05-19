import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Login";
import Table from './TableSubscriptionLayer';
import GameStart from './GameStart';
import {AUTH_TOKEN} from '../constants';

interface urlParams {
  gameid: string
}

export default function AppRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/poker/:gameid">
            <Table/>
          </Route>

          <Route path="/poker">
            <Table/>
          </Route>

          <Route path="/GameStart">
            <GameStart/>
          </Route>

          <Route path="/login/:gameid">
            <Login />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/">
            <Login />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}