import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./Login";
import Table from "./Table";
import GameStart from './GameStart';

export default function AppRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/poker">
            <Table />
          </Route>
          <Route path="/GameStart">
            <GameStart />
          </Route>
          <Route path="/Login">
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