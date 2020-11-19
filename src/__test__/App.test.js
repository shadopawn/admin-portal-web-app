import { render, screen, cleanup } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';

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


afterEach(cleanup);

test('renders welcome message', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>);
  const linkElement = screen.getByText(/Welcome to the Admin Portal/i);
  expect(linkElement).toBeInTheDocument();
});

// test('Navigation to Login page', () => {
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )

//   expect(screen.getByText(/Welcome to the Admin Portal/i)).toBeInTheDocument()
//   screen.getByText(/Takes you to Log in page/i).click();

//   expect(screen.getByTestId("loginHeader")).toBeInTheDocument()
// })

// test('Navigation redirect from Lesson Editor link to Login page when not logged in', () => {
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )

//   screen.getByText(/Lessons page/i).click();

//   expect(screen.getByTestId("loginHeader")).toBeInTheDocument()
// })

// test('Navigation redirect from Analytics link to Login page when not logged in', () => {
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )

//   screen.getByText(/Analytics page/i).click();

//   expect(screen.getByTestId("loginHeader")).toBeInTheDocument()
// })

// firebase.auth().signInWithEmailAndPassword("wpenglish27@gmail.com", "passwordAdmin");
// test('Navigation to Lesson Editor when logged in', () => {
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
//   screen.getByText(/Takes you to Log in page/i).click();
//   document.getElementById("txtEmail").value = "wpenglish27@gmail.com"
//   document.getElementById("txtPassword").value = "passwordAdmin"
//   console.log(screen.getByTestId("email").value)
//   console.log(screen.getByTestId("password").value)
//   screen.getByTestId("btnLogin").click();
//   //const promise = firebase.auth().signInWithEmailAndPassword("test@email.com", "testpass");
//   //console.log(promise)
//   console.log(firebase.auth().currentUser)

//   screen.getByText(/Lessons page/i).click();

//   expect(screen.getByText(/Lesson Editor/i)).toBeInTheDocument()
// })