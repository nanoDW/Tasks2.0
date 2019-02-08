import React from "react";
import styled from "styled-components";
import notes from "../img/notes.jpg";

const MainHeader = styled.header`
  height: 50vh;
  background: url(${notes}) no-repeat fixed bottom;
  background-size: cover;
  display: flex;
  align-items: center;
  margin-bottom: 3px;
`;

const H1 = styled.h1`
  margin: calc((40vh - 200px) / 2) auto;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  border: 2px solid black;
  width: 200px;
  font-family: "Kalam", cursive;
  font-size: 28px;
  text-align: center;
  font-weight: normal;
`;

export default function Header() {
  return (
    <MainHeader>
      <H1>Create your own list of tasks on sticky notes!</H1>
    </MainHeader>
  );
}
