import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import UserPanel from "./UserPanel/UserPanel";
import LandingPage from "./LandingPage/LandingPage";
import Footer from "./Footer";

const GlobalStyle = createGlobalStyle`
body, html, #root {
  margin: 0;
  padding: 0;
}

*, *::before, *::after {
  box-sizing: border-box;
}
`;

export const LoggedUser = React.createContext({});

export default class App extends React.Component {
  state = {
    hasToken: false,
    token: "",
    nick: "",
    role: ""
  };

  authUser = (nick, role, token, hasToken) => {
    this.setState({ nick: nick, role: role, token: token, hasToken: hasToken });
  };

  logout = () => {
    this.setState({ hasToken: false });
  };

  renderView = () => {
    return this.state.hasToken ? <UserPanel /> : <LandingPage />;
  };

  render() {
    return (
      <Router>
        <>
          <GlobalStyle />
          <LoggedUser.Provider
            value={{
              state: this.state,
              authUser: this.authUser,
              logout: this.logout
            }}
          >
            {" "}
            {this.renderView()}
          </LoggedUser.Provider>
          <Footer />
        </>
      </Router>
    );
  }
}
