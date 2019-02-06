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
      <>
        <GlobalStyle />
        {this.renderView()}
        <Footer />
      </>
    );
  }
}
