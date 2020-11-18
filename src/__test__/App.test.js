import { render, screen, userEvent } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAtCRHSSIwa5UepmVBQE6sPAeqI28S3XRk",
  projectId: "admin-portal-firebase",
};
firebase.initializeApp(firebaseConfig);

test('renders learn react link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>);
  const linkElement = screen.getByText(/Welcome to the Admin Portal/i);
  expect(linkElement).toBeInTheDocument();
});

test('full app rendering/navigating', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

  expect(screen.getByText(/Welcome to the Admin Portal/i)).toBeInTheDocument()
  screen.getByText(/Takes you to Log in page/i).click();

  expect(screen.getByTestId("loginHeader")).toBeInTheDocument()
})