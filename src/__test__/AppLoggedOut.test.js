import ReactDOM from 'react-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

afterEach(cleanup);

//setting up a mock version of firebase for testing
const mockSet = jest.fn();
mockSet.mockReturnValue(true);
jest.mock("firebase", () => ({
  initializeApp: jest.fn(),
  auth: () => ({
    onAuthStateChanged: jest.fn(path => ({
      set:mockSet
    })),
    signInWithEmailAndPassword: jest.fn(path => ({
      set: mockSet
    }))
  }),
  database: () => ({
    ref: () => ({
      once: () => ({
        then: jest.fn(path => ({
          set:mockSet
        }))
      })
    })
  })
}));

test('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>, div);
});

test('renders Home welcome message', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>);
  const welcomeHeader = screen.getByText(/Welcome to the Admin Portal/i);
  expect(welcomeHeader).toBeInTheDocument();
});

test('renders NavBar', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>);
  const loginHeader = screen.getByText(/Login Page/i);
  expect(loginHeader).toBeInTheDocument();
});

test('Navigation to Login page', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  expect(screen.getByText(/Welcome to the Admin Portal/i)).toBeInTheDocument()
  screen.getByText(/Login Page/i).click();
  expect(screen.getByTestId("loginHeader")).toBeInTheDocument()
})

test('Navigation redirect from Lesson Editor link to Login page when not logged in', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  screen.getByText(/Lessons Editor/i).click();
  expect(screen.getByTestId("loginHeader")).toBeInTheDocument()
})

test('Navigation redirect from Analytics link to Login page when not logged in', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  screen.getByText(/Analytics Dashboard/i).click();
  expect(screen.getByTestId("loginHeader")).toBeInTheDocument()
})

