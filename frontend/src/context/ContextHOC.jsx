import React from "react";
import { LoggedUser } from "../App";

export const ContextLoggedUser = Component => props => (
  <LoggedUser.Consumer>
    {context => <Component {...props} context={context} />}
  </LoggedUser.Consumer>
);
