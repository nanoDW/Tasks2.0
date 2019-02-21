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
  position: relative;

  &::before {
    position: absolute;
    top: 40px;
    left: 0;
    content: "";
    height: 2px;
    width: 100%;
    z-index: 2;
    background: linear-gradient(to right, #54dfa6, #9e54df);
  }

  &:first-child {
    &::after {
      position: absolute;
      top: 0px;
      left: 0;
      content: "";
      height: 2px;
      width: 100%;
      z-index: 2;
      background: linear-gradient(to right, #54dfa6, #9e54df);
    }
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
            <StyledLink to="/login" onClick={this.props.onClick}>
              Logout
            </StyledLink>
          </Item>
          <Item>
            <StyledLink to="/tasks">Tasks</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/tasks/new">Add a task</StyledLink>
          </Item>
          {/* <Item>
            <StyledLink to="/messages">Messages</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/messages/new">New message</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/users">Find users</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/friends">Friends</StyledLink>
          </Item>
          <Item>
            <StyledLink to="/statistics">Statistics</StyledLink>
          </Item> */}
        </List>
      </nav>
    );
  }
}
