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
    repeatPassword: "",
    email: "",
    error: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const data = {
      nick: this.state.login,
      password: this.state.password,
      email: this.state.email
    };

    try {
      if (this.state.repeatPassword === this.state.password) {
        const res = await axios.post("http://localhost:4500/api/users/", data);

        console.log(res);
        this.setState({
          login: "",
          password: "",
          repeatPassword: "",
          email: "",
          error: ""
        });
      } else {
        this.setState({ error: "Passwords are different." });
      }
    } catch (e) {
      console.log(e.response);

      this.setState({ error: e.message });
      this.setState({
        login: "",
        password: "",
        repeatPassword: "",
        email: ""
      });
      await console.log(this.state.error);
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputText
          type="text"
          value={this.state.login}
          onChangeDetection={this.handleChange}
          name="login"
          labelContent="Enter your login"
        />

        <InputText
          type="password"
          name="password"
          value={this.state.password}
          onChangeDetection={this.handleChange}
          labelContent="Enter your password"
        />

        <InputText
          type="password"
          name="repeatPassword"
          value={this.state.repeatPassword}
          onChangeDetection={this.handleChange}
          labelContent="Repeat your password"
        />

        <InputText
          type="email"
          name="email"
          value={this.state.email}
          onChangeDetection={this.handleChange}
          labelContent="Enter your email"
        />

        <Button type="submit" text="Register" />
        <p>{this.state.error}</p>
      </Form>
    );
  }
}
