import React from "react";
import { api } from "../api/api";
import { withUser } from "../context/withUser";

class TasksComponent extends React.Component {
  componentDidMount = async () => {
    const tasks = await api.get("/tasks/", {
      // prettier-ignore
      headers: { "xAuthToken": `${this.props.user.token}` }
    });
    console.log(tasks);
  };

  render() {
    return <div>{console.log(this, this.props)}</div>;
  }
}

export const Tasks = withUser(TasksComponent);
