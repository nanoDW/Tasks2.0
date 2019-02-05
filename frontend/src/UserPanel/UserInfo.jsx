import React from "react";

export default class UserInfo extends React.Component {
  render() {
    return (
      <div>
        You're logged as <i>nick</i>. <button>Logout</button>
      </div>
    );
  }
}
