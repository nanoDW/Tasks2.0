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

  authUser = (nick, role, token) => {
    this.setState({ nick: nick, role: role, token: token });
  };

  // renderView = () => {
  //   return this.state.hasToken ? (
  //     <UserPanel />
  //   ) : (
  //     <LoggedUser.Provider
  //       value={{ state: this.state, authUser: this.authUser }}
  //     >
  //       {" "}
  //       <LandingPage />
  //     </LoggedUser.Provider>
  //   );
  // };

  render() {
    const renderView = this.state.hasToken ? (
      <UserPanel />
    ) : (
      <LoggedUser.Provider
        value={{ state: this.state, authUser: this.authUser }}
      >
        {" "}
        <LandingPage />
      </LoggedUser.Provider>
    );
    return (
      <>
        <GlobalStyle />
        {renderView}
        <Footer />
      </>
    );
  }
}
