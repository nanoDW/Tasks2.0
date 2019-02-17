import React from "react";
import { Route } from "react-router-dom";
import { Tasks } from "./Tasks";
import Done from "./Done";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/tasks" component={Tasks} />
        <Route path="/done" component={Done} />
      </div>
    );
  }
}
