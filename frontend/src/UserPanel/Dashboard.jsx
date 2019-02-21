import React from "react";
import { Route, Switch } from "react-router-dom";
import { Tasks } from "./Tasks";
import NewTask from "./Done";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/tasks" component={Tasks} />
          <Route path="/tasks/new" component={NewTask} />
        </Switch>
      </div>
    );
  }
}
