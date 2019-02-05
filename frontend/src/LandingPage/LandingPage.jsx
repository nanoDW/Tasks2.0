import React from "react";
import SignIn from "./SignIn";
import Register from "./Register";

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
        <header>Motto</header>
        {this.setView()}
        <section>What is nice</section>
      </div>
    );
  }
}
