import React, { useState, useCallback } from "react";
import firebase from 'firebase';
import '../css/login.css';
import {useHistory} from 'react-router-dom';

export default function Login() {


    const history = useHistory();

    const redirectToHomePage = useCallback(() => history.push('/'), [history]);

    const LoginEventListen = () => {
        const email = document.getElementById("txtEmail").value;
        const pass = document.getElementById("txtPassword").value;
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message))
    }

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            document.getElementById("btnLogout").classList.remove('hide');
            redirectToHomePage()
        } else {
            console.log('not logged in');
            document.getElementById("btnLogout").classList.add('hide');
        }
    })

    return (
        <div>
            <input id="txtEmail" type="email" placeholder="Email"></input>

            <input id="txtPassword" type="password" placeholder="Password"></input>

            <button id="btnLogin" onClick={LoginEventListen}>
                Log in
            </button>

        </div>
    )
}
