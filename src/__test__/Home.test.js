import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render, screen } from '@testing-library/react';
import Home from '../components/Home';
import { BrowserRouter } from 'react-router-dom';

// The BrowserRouter is required for these test because Home contains "Links" from the same "react-router-dom" 
// which cannot work without being in a BrowserRouter that is contained in the index element in our app

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowserRouter><Home /></BrowserRouter>, div);
})

it('renders welcome message', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>);
  const linkElement = screen.getByText(/Welcome to the Admin Portal/i);
  expect(linkElement).toBeInTheDocument();
});
