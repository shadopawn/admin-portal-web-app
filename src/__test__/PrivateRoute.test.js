import { render, screen } from '@testing-library/react';
import PrivateRoute from '../components/PrivateRoute';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Analytics from '../components/Analytics';

//Used to prevent routing when not logged in

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
      })),
      currentUser: jest.fn(path => ({
        set: mockSet
      }))
    })
  }));


test("renders without crashing", () => {
    render(<BrowserRouter><PrivateRoute path="/testpath"></PrivateRoute></BrowserRouter>)
})

test("renders child component without crashing", () => {
    render(
        <BrowserRouter>
            <PrivateRoute path="/testpath">
                <Analytics />
            </PrivateRoute>
        </BrowserRouter>
    )
})

test("navigation to child component while logged in", () => {
    render(
        <BrowserRouter>
            <Switch>
                <PrivateRoute path="/">
                  	<Analytics />
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    )

    const linkLessons = screen.getByText(/Analytics/i);
    expect(linkLessons).toBeInTheDocument();
})