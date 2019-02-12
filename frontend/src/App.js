import React from "react";
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

  renderView = () => {
    return this.state.hasToken ? <UserPanel /> : <LandingPage />;
  };

  render() {
    return (
      <>
        <GlobalStyle />
        <LoggedUser.Provider
          value={{ state: this.state, authUser: this.authUser }}
        >
          {" "}
          {this.renderView()}
        </LoggedUser.Provider>
        <Footer />
      </>
    );
  }
}
