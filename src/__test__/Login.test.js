import { render, screen } from '@testing-library/react';
import Login from '../components/Login';
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAtCRHSSIwa5UepmVBQE6sPAeqI28S3XRk",
};
firebase.initializeApp(firebaseConfig);
firebase.auth().useEmulator('http://localhost:9099/');

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
  render(<Login to={location} />);
  const linkElement = screen.getByRole('button');
  expect(linkElement).toHaveTextContent('Log in');
});
