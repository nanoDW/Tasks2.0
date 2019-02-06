import React from "react";
import SignIn from "./SignIn";
import Register from "./Register";
import Header from "./Header";
import Assumptions from "./Assumptions";

export default class LandingPage extends React.Component {
  state = {
    hasAccount: true
  };

  setView = () => {
    return this.state.hasAccount ? <SignIn /> : <Register />;
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
