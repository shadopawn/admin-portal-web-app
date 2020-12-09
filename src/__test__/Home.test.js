import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render, screen } from '@testing-library/react';
import Home from '../components/Home';
import { MemoryRouter , Switch, Route, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from "history";

// The BrowserRouter is required for these test because Home contains "Links" from the same "react-router-dom" 
// which cannot work without being in a BrowserRouter that is contained in the index element in our app

afterEach(cleanup);

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowserRouter><Home /></BrowserRouter>, div);
})

test('renders welcome message', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>);
  const linkElement = screen.getByText(/Welcome to the Admin Portal/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Lesson Editor header', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>);
  const linkElement = screen.getByText(/Lessons/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Analytics Dashboard header', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>);
  const linkElement = screen.getByText(/Analytics/i);
  expect(linkElement).toBeInTheDocument();
});

test('Analytics Dashboard Link is on screen and clickable', () => {
  render(
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>);

  const linkAnalytics = screen.getByTestId("analyticsLink");
  linkAnalytics.click();
  expect(linkAnalytics).toBeInTheDocument();
});

test('Lesson Editor Link is on screen and clickable', () => {
  render(
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>);

  const linkLessons = screen.getByTestId("lessonLink");
  linkLessons.click();
  expect(linkLessons).toBeInTheDocument();
});
