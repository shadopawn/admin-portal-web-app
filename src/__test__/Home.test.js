import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render, screen } from '@testing-library/react';
import Home from '../components/Home';
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import LessonEditor from '../components/LessonEditor'
import { createMemoryHistory } from 'history'


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

test('Analytics Link', () => {
  render(
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>);

  const linkAnalytics = screen.getByText(/Analytics Dashboard/i);
  expect(linkAnalytics).toBeInTheDocument();
});

test('Lesson Editor Link', () => {
  render(
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>);

  const linkLessons = screen.getByText(/Lessons Editor/i);
  expect(linkLessons).toBeInTheDocument();
});