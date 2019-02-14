import React from "react";
import styled from "styled-components";

const LandingButton = styled.button`
  position: relative;
  width: 90%;
  height: 32px;
  font-size: 14px;
  background-color: transparent;
  border: 3px solid #54dfa6;
  border-radius: 8px;
  margin: 5px;

  &:focus {
    outline: none;
    border: 3px solid #54dfa6;
    background-color: white;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    content: "";
    background-color: #e8fff5;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
    z-index: -1;
  }

  &:hover {
    &::before {
      opacity: 0;
    }
  }
`;

export const Button = ({ text, ...props }) => (
  <LandingButton {...props}>{text}</LandingButton>
);
