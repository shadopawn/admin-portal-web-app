import React from "react";
import firebase from 'firebase';
import '../css/login.css';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }) {
    const auth = firebase.auth();
    console.log(auth)  

    const isLogin = () => {
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
          isLogin() ? (
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