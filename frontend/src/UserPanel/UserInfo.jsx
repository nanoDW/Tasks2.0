import React from "react";
import { LoggedUser } from "../App";
import { Button } from "../components/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
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
  width: 30%;
  padding: 10px 5px;
`;

const LoggedAs = styled.div`
  margin-top: 60px;
  font-family: "Duru Sans", sans-serif;
  font-size: 16px;
  text-align: right;
`;

class UserInfo extends React.Component {
  render() {
    return (
      <>
        <Header>
          <H2>Tasks 2.0</H2>
          <Div>
            <Button text="Logout" onClick={this.props.context.logout}>
              Logout
            </Button>
          </Div>
        </Header>
        <LoggedAs>
          You're logged as <Link to="/me">{this.props.context.state.nick}</Link>
          .
        </LoggedAs>
      </>
    );
  }
}

const UserNavbar = Component => props => (
  <LoggedUser.Consumer>
    {context => <Component {...props} context={context} />}
  </LoggedUser.Consumer>
);

export const UserNav = UserNavbar(UserInfo);
