import React from "react";
//import "./App.css";
import UserPanel from "./UserPanel/UserPanel";
import LandingPage from "./LandingPage/LandingPage";
import Footer from "./Footer";

export default class App extends React.Component {
  state = {
    hasToken: false,
    token: null
  };

  renderView = () => {
    return this.state.hasToken ? <UserPanel /> : <LandingPage />;
  };

  render() {
    return (
      <div>
        {this.renderView()}
        <Footer />
      </div>
    );
  }
}
