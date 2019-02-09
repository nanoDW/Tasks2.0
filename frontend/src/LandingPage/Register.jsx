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
    nick: "",
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
      nick: this.state.nick,
      password: this.state.password,
      repeatPassword: this.state.repeatPassword,
      email: this.state.email
    };

    const validation = this.validate(data);
    try {
      if (validation.result) {
        const res = await axios.post("http://localhost:4500/api/users/", data);

        console.log(res);
        this.setState({
          nick: "",
          password: "",
          repeatPassword: "",
          email: "",
          error: ""
        });

        this.props.onLogin(this.setState({ hasAccount: true }));
      } else {
        this.setState({ error: validation.message });
      }
    } catch (e) {
      console.log(e.response);

      this.setState({ error: e.message });
      this.setState({
        nick: "",
        password: "",
        repeatPassword: "",
        email: ""
      });
      await console.log(this.state.error);
    }
  };

  validate(data) {
    const nick = data.nick.trim().length;
    const password = data.password.trim().length;
    const email = data.email.trim().length;

    if (nick < 3 || nick > 15) {
      return { result: false, message: "Login should have 3-15 characters." };
    }
    if (password < 8 || password > 20) {
      return {
        result: false,
        message: "Password should have 8-20 characters."
      };
    }
    if (data.password !== data.repeatPassword) {
      return {
        result: false,
        message: "Passwords are different."
      };
    }
    if (email < 8 || email > 40) {
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
          value={this.state.nick}
          onChangeDetection={this.handleChange}
          name="nick"
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
