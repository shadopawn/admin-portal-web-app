import { render, screen } from '@testing-library/react';
import Login from '../components/Login';
import * as firebase from 'firebase'

const mockSet = jest.fn();
mockSet.mockReturnValue(true);


jest.mock("firebase", () => ({
    initializeApp: jest.fn(),
    auth: () => ({
      onAuthStateChanged: jest.fn(path => ({
        set:mockSet
      })),
      signInWithEmailAndPassword: mockSet,
      currentUser: jest.fn(path => ({
        set: mockSet
      }))
    })
  }));

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/home"
    }),
    useHistory: () => ({
      push: mockHistoryPush
    })
}));

test('renders log in button button', () => {
  const location = {
    pathname: '/home',
    state: { fromDashboard: true }
  }
  render(<div id="btnLogout" className="hide"><Login to={location} ></Login></div>);
  const linkElement = screen.getByRole('button');
  expect(linkElement).toHaveTextContent('Log in');
});

test('Redirect after logging in', () => {
  const location = {
    pathname: '/home',
    state: { fromDashboard: true }
  }
  render(<div id="btnLogout" className="hide"><Login to={location} /></div>);

  screen.getByTestId("email").value = "test@email.com"
  screen.getByTestId("password").value = "testpass"
  screen.getByTestId("btnLogin").click();

  expect(mockHistoryPush).toHaveBeenCalled();
})
