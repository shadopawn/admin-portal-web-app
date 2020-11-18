import React, { useCallback } from "react";
import firebase from 'firebase';
import '../css/login.css';
import {useHistory, useLocation} from 'react-router-dom';

export default function Login() {

    let location = useLocation();
    const history = useHistory();
    let { from } = location.state || { from: { pathname: "/" } };
    
    const redirectToPreviousPage = useCallback(() => history.push(from), [history]);

    const LoginEventListen = () => {
        const email = document.getElementById("txtEmail").value;
        const pass = document.getElementById("txtPassword").value;
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message))
    }

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            document.getElementById("btnLogout").classList.remove('hide');
            redirectToPreviousPage();
        } else {
            document.getElementById("btnLogout").classList.add('hide');
        }
    })

    return (
        <div>
            <h1 data-testid="loginHeader">Log in</h1>
            <input id="txtEmail" type="email" placeholder="Email"></input>

            <input id="txtPassword" type="password" placeholder="Password"></input>

            <button id="btnLogin" onClick={LoginEventListen}>Log in</button>
        </div>
    )
}
