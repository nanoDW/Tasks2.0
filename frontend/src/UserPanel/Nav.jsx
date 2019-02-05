import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class Nav extends React.Component {
  render() {
    return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/tasks">current tasks</Link>
            </li>
            <li>
              <Link to="/done">done</Link>
            </li>
            <li>
              <Link to="/giventasks">given tasks</Link>
            </li>
            <li>
              <Link to="/sendmessage">send message</Link>
            </li>
            <li>
              <Link to="/messages">messages</Link>
            </li>
            <li>
              <Link to="/friendslist">friends list</Link>
            </li>
          </ul>
        </nav>
      </Router>
    );
  }
}
