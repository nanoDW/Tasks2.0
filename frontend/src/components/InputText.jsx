import React from "react";
import styled from "styled-components";

const Label = styled.label`
  width: 70vw;
  height: 20px;
  text-align: center;
  font-size: 16px;
  margin: 10px auto 0;
`;

const Input = styled.input`
  margin: 3px;
  width: 70vw;
  height: 30px;
  border: 0 solid white;
  border-radius: 5px;
  text-align: center;
  background-color: #eafffc;

  &:focus {
    outline: none;
    background-color: #fff;
  }
`;

const Frame = styled.div`
  margin: 10px;
  width: calc(70vw + 6px);
  height: 36px;
  background: linear-gradient(to right, #54dfa6, #9e54df);
  border-radius: 8px;
`;

export const InputText = ({
  name,
  labelContent,
  id,
  type,
  onChangeDetection
}) => {
  return (
    <>
      <Label htmlFor={name}>{labelContent}</Label>
      <Frame>
        <Input type={type} name={name} onChange={onChangeDetection} />
      </Frame>
    </>
  );
};
