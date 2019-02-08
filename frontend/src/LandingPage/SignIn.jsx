import React from "react";
import { InputText } from "../components/InputText";
import styled from "styled-components";
import { Button } from "../components/Button";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";

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
  state = {
    login: "",
    password: "",
    error: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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

  changeView = e => {
    e.preventDefault();
    this.props.onRegister(this.setState({ hasAccount: false }));
  };

  render() {
    return (
      <Router>
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
          <Link
            to="/login"
            style={{
              display: "flex",
              width: "50%",
              textDecoration: "none"
            }}
          >
            <Button type="submit" text="Sign in" />
          </Link>
          <Link
            to="/register"
            style={{
              display: "flex",
              width: "50%",
              textDecoration: "none"
            }}
          >
            <Button
              type="button"
              text="Sign up"
              onClick={this.props.onRegister}
            />
          </Link>
          <p>{this.state.error}</p>
        </Form>
      </Router>
    );
  }
}
