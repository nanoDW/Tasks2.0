import React from "react";
import { LoggedUser } from "../App";

class UserInfo extends React.Component {
  render() {
    return (
      <div>
        You're logged as {this.props.context.state.nick}.<button>Logout</button>
      </div>
    );
  }
}

const UserNavbar = Component => props => (
  <LoggedUser.Consumer>
    {context => <Component {...props} context={context} />}
  </LoggedUser.Consumer>
);

export const UserNav = UserNavbar(UserInfo);
