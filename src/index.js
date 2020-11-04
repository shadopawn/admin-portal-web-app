import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAtCRHSSIwa5UepmVBQE6sPAeqI28S3XRk",
  authDomain: "admin-portal-firebase.firebaseapp.com",
  databaseURL: "https://admin-portal-firebase.firebaseio.com",
  projectId: "admin-portal-firebase",
  storageBucket: "admin-portal-firebase.appspot.com",
  messagingSenderId: "718485621784",
  appId: "1:718485621784:web:cac547629a659e8cd1c76d",
  measurementId: "G-MS08DSSK4Y"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
