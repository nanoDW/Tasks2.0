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

const ErrorMessage = styled.p`
  font-size: 14px;
  margin: 0;
  text-align: center;
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

    const validation = this.validate(data);
    try {
      if (
        validation.result &&
        this.state.password === this.state.repeatPassword
      ) {
        const res = await axios.post("http://localhost:4500/api/users/", data);

        console.log(res);
        this.setState({
          login: "",
          password: "",
          repeatPassword: "",
          email: "",
          error: ""
        });

        this.props.onLogin(this.setState({ hasAccount: true }));
      } else {
        if (validation.message) {
          this.setState({ error: validation.message });
        } else {
          this.setState({ error: "Passwords are different." });
        }
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

  validate(data) {
    const { nick, password, email } = data;

    if (nick.length < 3 || nick.length > 20) {
      return { result: false, message: "Login should have 3-15 characters." };
    }
    if (password.length < 8 || password.length > 25) {
      return {
        result: false,
        message: "Password should have 8-20 characters."
      };
    }
    if (email.length < 8 || email.length > 35) {
      return {
        result: false,
        message: "Invalid email."
      };
    } else return { result: true, message: "" };
  }

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
        <ErrorMessage>{this.state.error}</ErrorMessage>

        <Button type="submit" text="Register" />
      </Form>
    );
  }
}
