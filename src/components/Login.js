import React, { useCallback, useEffect } from "react";
import firebase from 'firebase';
import '../css/login.css';
import {useHistory, useLocation} from 'react-router-dom';

export default function Login() {

    let location = useLocation();
    const history = useHistory();
    console.log(history);
    let { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => {
        onSuccessfulLogin()
    });

    const LoginEventListen = () => {
        const email = document.getElementById("txtEmail").value;
        const pass = document.getElementById("txtPassword").value;
        const auth = firebase.auth();
        auth.signInWithEmailAndPassword(email, pass);
        onSuccessfulLogin();
    }

    const onSuccessfulLogin = () =>{
        if(isUserLoggedIn()) {
            redirectToPreviousPage();
            document.getElementById("btnLogout").classList.remove('hide');
        } else {
            document.getElementById("btnLogout").classList.add('hide');
        }
    }

    const isUserLoggedIn = () => {
        var user = firebase.auth().currentUser;
        return user ? true : false
    }

    const redirectToPreviousPage = useCallback(() => history.push(from), [history]);

    return (
        <div>
            <h1 data-testid="loginHeader">Log in</h1>
            <input id="txtEmail" type="email" data-testid="email" placeholder="Email"></input>

            <input id="txtPassword" type="password" data-testid="password" placeholder="Password"></input>

            <button id="btnLogin" data-testid="btnLogin" onClick={LoginEventListen}>Log in</button>
        </div>
    )
}
