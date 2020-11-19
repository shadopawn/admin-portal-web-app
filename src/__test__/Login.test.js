import { render, screen } from '@testing-library/react';
import Login from '../components/Login';
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

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/home"
    })
}));

test('renders button', () => {
  const location = {
    pathname: '/home',
    state: { fromDashboard: true }
  }
  render(<div id="btnLogout" className="hide"><Login to={location} ></Login></div>);
  const linkElement = screen.getByRole('button');
  expect(linkElement).toHaveTextContent('Log in');
});

// test('Redirect after logging in', () => {
//   const location = {
//     pathname: '/home',
//     state: { fromDashboard: true }
//   }
//   render(<Login to={location} />);

//   document.getElementById("txtEmail").value = "wpenglish27@gmail.com"
//   document.getElementById("txtPassword").value = "passwordAdmin"
//   console.log(screen.getByTestId("email").value)
//   console.log(screen.getByTestId("password").value)
//   screen.getByTestId("btnLogin").click();
//   console.log(firebase.auth().currentUser)

//   const linkElement = screen.getByText(/Welcome to the Admin Portal/i);
//   expect(linkElement).toBeInTheDocument();
// })
