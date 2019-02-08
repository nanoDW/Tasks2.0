import React from "react";
import styled from "styled-components";

const LandingButton = styled.button`
  width: 45%;
  height: 32px;
  font-size: 14px;
  padding: 3px;
  background-color: #eafffc;
  border: 3px solid #54dfa6;
  border-radius: 8px;
  margin: 15px 5px;

  &:focus {
    outline: none;
    border: 3px solid #54dfa6;
    background-color: white;
  }
`;

export const Button = ({ type, text, onClick }) => {
  if (onClick) {
    return (
      <LandingButton type={type} onClick={onClick}>
        {text}
      </LandingButton>
    );
  } else {
    return <LandingButton type={type}>{text}</LandingButton>;
  }
};
