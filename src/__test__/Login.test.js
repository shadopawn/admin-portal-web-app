import { render, screen } from '@testing-library/react';
import Login from '../components/Login';
import * as firebase from 'firebase'

const mockSet = jest.fn();
mockSet.mockReturnValue(true);

const mockUser = jest.fn();
mockUser.mockReturnValue(false);

const mockSign = jest.fn();
mockSign.mockImplementation(() => {return Promise.resolve('result of createUserWithEmailAndPassword')});

jest.mock("firebase", () => ({
    initializeApp: jest.fn(),
    auth: () => ({
      onAuthStateChanged: jest.fn(path => ({
        set:mockSet
      })),
      signInWithEmailAndPassword: mockSign,
      currentUser: jest.fn(path => ({
        set: mockSet
      })),
      promise: () => ({
        catch: jest.fn(path => ({
          set: mockSet
        }))
      })
    })
  }));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/home"
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
  render(<Login to={location} />);

  screen.getByTestId("email").value = "test@email.com"
  screen.getByTestId("password").value = "testpass"
  screen.getByTestId("btnLogin").click();

  const linkElement = screen.getByText(/Welcome to the Admin Portal/i);
  expect(linkElement).toBeInTheDocument();
})
