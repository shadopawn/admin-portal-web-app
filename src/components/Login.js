import React, { useCallback, useEffect } from "react";
import firebase from 'firebase';
import '../css/login.css';
import {useHistory, useLocation} from 'react-router-dom';

export default function Login() {

    let location = useLocation();
    const history = useHistory();
    let { from } = location.state || { from: { pathname: "/" } };

    const LoginEventListen = () => {
        const email = document.getElementById("txtEmail").value;
        const pass = document.getElementById("txtPassword").value;
        const auth = firebase.auth();
        auth.signInWithEmailAndPassword(email, pass);
    }

    const redirectToPreviousPage = useCallback(() => history.push(from), [history]);

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            document.getElementById("btnLogout").classList.remove('hide');
            document.getElementById("loginLink").classList.add('hide');
            redirectToPreviousPage();
        } else {
            document.getElementById("btnLogout").classList.add('hide');
            document.getElementById("loginLink").classList.remove('hide');
        }
    })

    return (
        <div className="loginContainer">
            <h1 data-testid="loginHeader">Admin Portal Log in</h1>
            <input id="txtEmail" type="email" data-testid="email" placeholder="Email"></input>

            <input id="txtPassword" type="password" data-testid="password" placeholder="Password"></input>

            <button id="btnLogin" data-testid="btnLogin" onClick={LoginEventListen}>Log in</button>
        </div>
    )
}
