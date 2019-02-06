import React from "react";
import styled from "styled-components";

const LandingButton = styled.button`
  width: 40%;
  height: 32px;
  font-size: 16px;
  padding: 3px;
  background-color: white;
  border: 3px solid #7999c3;
  border-radius: 3px;

  &:active {
    outline: none;
  }
`;

export const Button = ({ text }) => {
  return <LandingButton>{text}</LandingButton>;
};
