import { render, screen } from '@testing-library/react';
import PrivateRoute from '../components/PrivateRoute';
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAtCRHSSIwa5UepmVBQE6sPAeqI28S3XRk",
};
firebase.initializeApp(firebaseConfig);
firebase.auth().useEmulator('http://localhost:9099/');

test('renders button', () => {
  render(<PrivateRoute />);
  const linkElement = screen.getByRole('button');
  expect(linkElement).toHaveTextContent('Log in');
});