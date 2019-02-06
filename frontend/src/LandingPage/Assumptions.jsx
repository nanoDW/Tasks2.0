import React from "react";
import SingleAssum from "./SingleAssum";

export default class Assumptions extends React.Component {
  render() {
    return (
      <section>
        <h3>What can you do with this app?</h3>
        <SingleAssum text="1" color="red" angle="10deg" />
      </section>
    );
  }
}
