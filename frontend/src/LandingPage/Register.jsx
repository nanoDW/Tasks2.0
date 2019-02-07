import React from "react";
import axios from "axios";
import styled from "styled-components";
import { InputText } from "../components/InputText";
import { Button } from "../components/Button";

const Form = styled.form`
  width: 80vw;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  font-family: "Duru Sans";
`;

export default class Register extends React.Component {
  state = {
    login: "",
    password: "",
    email: "",
    error: ""
  };

  handleLoginChange = e => {
    this.setState({ login: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const data = {
      nick: this.state.login,
      password: this.state.password,
      email: this.state.email
    };

    try {
      const res = await axios.post("http://localhost:4500/api/users/", data);
      console.log(res);
    } catch (e) {
      console.log(e.body);
      this.setState({ error: e.message });
      await console.log(this.state.error);
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
          id="5"
        />
        <InputText
          type="password"
          name="password"
          value={this.state.password}
          onChangeDetection={this.handlePasswordChange}
          labelContent="Enter your password"
          id="6"
        />

        <InputText
          type="password"
          name="repeatPassword"
          value={this.state.password}
          onChangeDetection={this.handlePasswordChange}
          labelContent="Verify your password"
          id="7"
        />

        <InputText
          type="email"
          name="email"
          value={this.state.password}
          onChangeDetection={this.handleEmailChange}
          labelContent="Enter your email"
          id="8"
        />
        <Button type="submit" text="Register" />
        <p>{this.state.error}</p>
      </Form>
    );
  }
}
