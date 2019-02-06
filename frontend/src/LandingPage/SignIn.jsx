import React from "react";
import { InputText } from "../components/InputText";
import styled from "styled-components";

const Form = styled.form`
  width: 80vw;
  border: 2px solid black;
  border-radius: 5px;
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  font-family: "PT Sans";
`;

export default class SignIn extends React.Component {
  render() {
    return (
      <Form>
        <InputText name="login" labelContent="Enter your login" id="1" />
        <InputText name="password" labelContent="Enter your password" id="2" />
      </Form>
    );
  }
}
