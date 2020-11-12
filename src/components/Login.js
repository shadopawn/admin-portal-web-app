import React, { useState } from "react";
import firebase from 'firebase';
import '../css/login.css';

export default function Login() {

    const LoginEventListen = () => {
        const email = document.getElementById("txtEmail").value;
        const pass = document.getElementById("txtPassword").value;
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message))
    }

    const SignUpEventListen = () => {
        const email = document.getElementById("txtEmail").value;
        const pass = document.getElementById("txtPassword").value;
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message))
    }

    const LogoutEventListen = () =>{
        firebase.auth().signOut();
    }

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            document.getElementById("btnLogout").classList.remove('hide');
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

            <button id="btnSignUp" onClick={SignUpEventListen}>
                Sign up
            </button>

            <button id="btnLogout" className="hide" onClick={LogoutEventListen}>
                Log out
            </button>
        </div>
    )
}
