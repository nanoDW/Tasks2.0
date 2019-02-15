import React from "react";
import { api } from "../api/api";
import { withUser } from "../context/withUser";

export default class TasksComponent extends React.Component {
  componentDidMount = async () => {
    const tasks = api.get(
      "/tasks" //{
      //  headers: { xauthtoken: `${this.props.context.state.token}` }
      // }
    );
    console.log(tasks, this.props);
  };

  render() {
    return <div>{console.log(this, this.props)}</div>;
  }
}

export const Tasks = withUser(TasksComponent);
