import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { BrowserRouter } from 'react-router-dom';

//setting up a mock version of firebase for testing
const mockSet = jest.fn();
mockSet.mockReturnValue(true);
jest.mock("firebase", () => ({
  initializeApp: jest.fn(),
  auth: () => ({
    ref: mockSignOut
  })
}));

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowserRouter><NavBar /></BrowserRouter>, div);
})