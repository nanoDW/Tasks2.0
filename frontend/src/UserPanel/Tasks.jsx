import React from "react";
import { api } from "../api/api";
import { ContextLoggedUser } from "../context/ContextHOC";

export default class TasksComponent extends React.Component {
  componentDidMount = async () => {
    const tasks = api.get(
      "/tasks" //{
      //  headers: { xauthtoken: `${this.props.context.state.token}` }
      // }
    );
    console.log(tasks);
  };

  render() {
    return <div>{console.log(this)}</div>;
  }
}

export const Tasks = ContextLoggedUser(TasksComponent);
