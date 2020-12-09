import { render, screen, cleanup } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import { database } from 'firebase-admin';

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

test('renders welcome message', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>);
  const linkElement = screen.getByText(/Welcome to the Admin Portal/i);
  expect(linkElement).toBeInTheDocument();
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

