import React from "react";
import { Login } from "./SignIn";
import Register from "./Register";
import Header from "./Header";
import Assumptions from "./Assumptions";

export default class LandingPage extends React.Component {
  state = {
    hasAccount: true
  };

  setView = () => {
    return this.state.hasAccount ? (
      <Login onRegister={this.changeView} />
    ) : (
      <Register onLogin={this.onSignIn} />
    );
  };

  changeView = () => {
    this.setState({ hasAccount: false });
  };

  onSignIn = () => {
    this.setState({ hasAccount: true });
  };

  render() {
    return (
      <div>
        <Header />
        {this.setView()}
        <Assumptions />
      </div>
    );
  }
}
