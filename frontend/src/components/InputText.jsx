import React from "react";
import styled from "styled-components";

const Label = styled.label`
  width: 70vw;
  height: 20px;
  text-align: center;
  font-size: 20px;
`;

const Input = styled.input`
  width: 70vw;
  height: 30px;
  border: 2px solid black;
  margin: 10px;
  text-align: center;

  &::before {
    content: "";
    top: 0;
    left: 0;
    width: calc(70vw + 4px);
    height: 34px;
    background: linear-gradient(red, blue);
    border: green;
  }
`;

export const InputText = ({ name, labelContent, id }) => {
  return (
    <>
      <Label htmlFor={name}>{labelContent}</Label>
      <Input type="text" name={name} id={id} />
    </>
  );
};
