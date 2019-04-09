// lib
import React from "react";
// src
import { Route, Redirect } from "react-router-dom";
import { auth } from "../utils/utils";

export const PrivateRoute = (props: any) => {
  const { component: Component } = props;
  return (
    <Route
      render={props =>
        auth.isSignedIn() === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
