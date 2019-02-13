import React from "react";
import styled from "styled-components";

const LandingButton = styled.button`
  width: 90%;
  height: 32px;
  font-size: 14px;
  padding: 3px;
  background-color: #eafffc;
  border: 3px solid #54dfa6;
  border-radius: 8px;
  margin: 10px 5px;

  &:focus {
    outline: none;
    border: 3px solid #54dfa6;
    background-color: white;
  }
`;

export const Button = ({ text, ...props }) => (
  <LandingButton {...props}>{text}</LandingButton>
);
