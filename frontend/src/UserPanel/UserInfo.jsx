import React from "react";
import { LoggedUser } from "../App";

class UserInfo extends React.Component {
  logMe = () => {
    console.log(this.props.context);
  };

  render() {
    return (
      <div>
        You're logged as <i>{this.props.context.state.nick}</i>.{this.logMe()}
        <button>Logout</button>
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
