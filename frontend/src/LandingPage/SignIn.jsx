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
  font-family: "Duru Sans", sans-serif;
`;

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      error: ""
    };
  }

  handleLoginChange = e => {
    this.setState({ login: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const data = {
      nick: this.state.login,
      password: this.state.password
    };

    try {
      const res = await axios.post("http://localhost:4500/api/auth/", data);
      console.log(res);
    } catch (e) {
      console.log(e);
      this.setState({ error: e.message });
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
        <Button type="button" text="Sign up" onClick={this.props.onRegister} />
        <p>{this.state.error}</p>
      </Form>
    );
  }
}
