import React from "react";
import { LoggedUser } from "../App";

export const withUser = Component => props => (
  <LoggedUser.Consumer>
    {context => <Component {...props} user={context} />}
  </LoggedUser.Consumer>
);
