import React from "react";
import { UserNav } from "./UserInfo";
import Dashboard from "./Dashboard";

export default class UserPanel extends React.Component {
  state = {
    display: "currentTasks"
  };

  render() {
    return (
      <div>
        <UserNav />
        <Dashboard />
      </div>
    );
  }
}
