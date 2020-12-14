import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Login from '../components/Login';

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

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/home"
    }),
    useHistory: () => ({
      push: mockSet
    })
}));

test('renders without crashing', () => {
  const location = {
    pathname: '/home',
    state: { fromDashboard: true }
  }
  const div = document.createElement("div");
  ReactDOM.render(<div id="btnLogout" className="hide"><Login to={location} ></Login></div>, div);
});

test('renders correct header', () => {
  const location = {
    pathname: '/home',
    state: { fromDashboard: true }
  }
  render(<div id="btnLogout" className="hide"><Login to={location} ></Login></div>);
  const header = screen.getByText(/Admin Portal Log in/i);
  expect(header).toBeInTheDocument()
});

test('renders correct email placeholder', () => {
  const location = {
    pathname: '/home',
    state: { fromDashboard: true }
  }
  render(<div id="btnLogout" className="hide"><Login to={location} ></Login></div>);
  const emailInput = screen.getByTestId("emailInput");
  expect(emailInput.placeholder).toBe("Email")
});

test('renders correct password placeholder', () => {
  const location = {
    pathname: '/home',
    state: { fromDashboard: true }
  }
  render(<div id="btnLogout" className="hide"><Login to={location} ></Login></div>);
  const passwordInput = screen.getByTestId("passwordInput");
  expect(passwordInput.placeholder).toBe("Password")
});

test('Login button is on screen and clickable', () => {
  const location = {
    pathname: '/home',
    state: { fromDashboard: true }
  }
  render(<div id="btnLogout" className="hide"><Login to={location} ></Login></div>);
  const linkElement = screen.getByTestId('btnLogin');
  expect(linkElement).toHaveTextContent('Log in');
});

test('Calls sign in function', () => {
  const location = {
    pathname: '/home',
    state: { fromDashboard: true }
  }
  render(<div id="btnLogout" className="hide"><Login to={location} /></div>);

  screen.getByTestId("emailInput").value = "test@email.com"
  screen.getByTestId("passwordInput").value = "testpass"
  screen.getByTestId("btnLogin").click();

  expect(mockSet).toHaveBeenCalled()
})

test('Redirect after logging in', () => {
  const location = {
    pathname: '/home',
    state: { fromDashboard: true }
  }
  render(<div id="btnLogout" className="hide"><Login to={location} /></div>);

  screen.getByTestId("emailInput").value = "test@email.com"
  screen.getByTestId("passwordInput").value = "testpass"
  screen.getByTestId("btnLogin").click();

  expect(mockSet).toHaveBeenCalled();
})
