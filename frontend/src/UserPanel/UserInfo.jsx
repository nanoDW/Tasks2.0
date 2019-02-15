import React from "react";
import { withUser } from "../context/withUser";
import { Nav } from "./Nav";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-between;
  background-color: #e8fff5;
  padding: 10px 10px 0p;
  margin: 0;
`;

const H2 = styled.h2`
  font-family: "Kalam", cursive;
  font-size: 28px;
  margin: 10px 10px 0;
`;

const Div = styled.div`
  top: 55px;
  width: 100%;
  padding: 0;
  display: ${props => props.display};
  position: fixed;
  z-index: 1;
`;

const LoggedAs = styled.div`
  margin-top: 60px;
  font-family: "Duru Sans", sans-serif;
  font-size: 16px;
  text-align: right;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-weight: bold;
  cursor: pointer;
`;

const Hamburger = styled.button`
  height: 32px;
  width: 52px;
  background-color: #fff;
  border: 3px solid #54dfa6;
  border-radius: 8px;
  margin: 10px;
  position: relative;
  display: flex;

  &::before {
    margin: 0;
    position: absolute;
    content: "";
    top: 5px;
    left: 7px;
    width: 32px;
    height: 10px;
    border-top: 3px solid #54dfa6;
    border-bottom: 3px solid #54dfa6;
    z-index: 1;
  }

  &::after {
    margin: 0;
    position: absolute;
    content: "";
    top: 19px;
    left: 7px;
    width: 32px;
    height: 5px;
    border-top: 3px solid #54dfa6;
    z-index: 1;
  }
`;

class UserInfo extends React.Component {
  state = {
    displayStyle: "none"
  };

  changeVisibility = () => {
    const displayStyle = this.state.displayStyle === "block" ? "none" : "block";
    this.setState({
      displayStyle: displayStyle
    });
  };

  render() {
    return (
      <>
        <Header>
          <H2>Tasks 2.0</H2>
          <Hamburger onClick={this.changeVisibility} />
        </Header>
        <Div display={this.state.displayStyle}>
          <Nav onClick={this.props.user.logout} />
        </Div>
        <LoggedAs>
          You're logged as{" "}
          <StyledLink to="/me">{this.props.user.state.nick}</StyledLink>.
        </LoggedAs>
      </>
    );
  }
}

export const UserNav = withUser(UserInfo);
