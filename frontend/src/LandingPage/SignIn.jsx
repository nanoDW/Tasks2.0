import React from "react";
import { InputText } from "../components/InputText";
import styled from "styled-components";
import { Button } from "../components/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { withUser } from "../context/withUser";

const Form = styled.form`
  width: 80vw;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  font-family: "Duru Sans", sans-serif;
  height: 50vh;
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  margin: 0;
  text-align: center;
`;

const FlexContainer = styled.div`
  display: flex;
  width: 50%;
  text-decoration: none;
`;

class SignIn extends React.Component {
  state = {
    nick: "",
    password: "",
    role: "",
    token: "",
    error: "",
    hasToken: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const data = {
      nick: this.state.nick,
      password: this.state.password
    };

    const validation = this.validate(data);
    try {
      if (validation.result) {
        const res = await axios.post("http://localhost:4500/api/auth/", data);
        this.setState({
          role: res.data.role,
          token: res.headers.xauthtoken,
          hasToken: true
        });
        this.props.user.authUser(
          this.state.nick,
          this.state.role,
          this.state.token,
          this.state.hasToken
        );
      } else {
        this.setState({ error: validation.message });
      }
    } catch (e) {
      console.log(e);
      this.setState({ error: e.message });
    }
  };

  validate(data) {
    const nick = data.nick.trim().length;
    const password = data.password.trim().length;

    if (nick < 3 || nick > 15) {
      return { result: false, message: "Login should have 3-15 characters." };
    }
    if (password < 8 || password > 20) {
      return {
        result: false,
        message: "Password should have 8-20 characters."
      };
    } else return { result: true, message: "" };
  }

  changeView = e => {
    e.preventDefault();
    this.props.onRegister(this.setState({ hasAccount: false }));
  };

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
        <ErrorMessage>{this.state.error}</ErrorMessage>
        <FlexContainer>
          <Button type="submit" text="Sign in" />
        </FlexContainer>
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
      </Form>
    );
  }
}

export const Login = withUser(SignIn);
