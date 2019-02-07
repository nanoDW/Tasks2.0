import React from "react";
import { InputText } from "../components/InputText";
import styled from "styled-components";
import { Button } from "../components/Button";
import axios from "axios";

const Form = styled.form`
  width: 80vw;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  font-family: "PT Sans";
`;

export default class SignIn extends React.Component {
  state = {
    login: "",
    password: ""
  };

  handleLoginChange = e => {
    this.setState({ login: e.target.value });
    console.log(this.state.login);
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
    console.log(this.state.password);
  };

  handleSubmit = async e => {
    e.preventDefault();

    const data = {
      nick: "nanoDW",
      password: this.state.password
    };

    try {
      JSON.stringify(data);

      const userData = await axios.post(
        "http://localhost:4500/api/auth/",
        data
      );
      console.log(userData, 67);
    } catch (e) {
      console.log(e.message, 1);
      this.setState({ login: "", password: "" });
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputText
          type="text"
          value={this.state.login}
          onChangeDetection={this.handleLoginChange}
          name="login"
          labelContent="Enter your login"
          id="1"
        />
        <InputText
          type="password"
          name="password"
          value={this.state.password}
          onChangeDetection={this.handlePasswordChange}
          labelContent="Enter your password"
          id="2"
        />
        <Button type="submit" text="Sign in" />
      </Form>
    );
  }
}
