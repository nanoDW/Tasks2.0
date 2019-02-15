import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const List = styled.ul`
  background-color: #e8fff5;
  width: 100%;
  margin: 0;
  list-style-type: none;
  padding: 0;
`;

const Item = styled.li`
  font-family: "Duru Sans", sans-serif;
  font-size: 16px;
  border-bottom: 2px solid #54dfa6;
  width: 100%;

  &:first-child {
    border-top: 2px solid #54dfa6;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  padding: 10px;
  display: block;
  text-decoration: none;
  text-align: center;
  color: #000;
`;

export class Nav extends React.Component {
  render() {
    return (
      <nav>
        <List>
          <Item>
            {console.log(this.props)}
            <StyledLink to="/login" onClick={this.props.onClick}>
              logout
            </StyledLink>
          </Item>
          <Item>
            <StyledLink to="/tasks">current tasks</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/done">done</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/giventasks">given tasks</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/sendmessage">send message</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/messages">messages</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/friendslist">friends list</StyledLink>
          </Item>
        </List>
      </nav>
    );
  }
}
