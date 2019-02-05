import React from "react";
import Nav from "./Nav";
import UserInfo from "./UserInfo";
import Dashboard from "./Dashboard";

export default class UserPanel extends React.Component {
  state = {
    display: "currentTasks"
  };

  render() {
    return (
      <div>
        <Nav />
        <UserInfo />
        <Dashboard />
      </div>
    );
  }
}
