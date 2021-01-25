import React from "react";
import '../css/login.css';
import firebase from 'firebase';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }) {

    const isUserLoggedIn = () => {
        var user = firebase.auth().currentUser;
        if (user) {
            return true;
        } else {
            return false;
        }
    }

    return (
      <Route
        {...rest}
        render={({ location }) =>
        isUserLoggedIn() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }