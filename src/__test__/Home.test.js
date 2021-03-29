import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter , Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from '../components/Home';
import Analytics from '../components/Analytics';
import LessonPacks from '../components/LessonPacks';
import { LessonDataContext } from '../contexts/LessonDataContext'


// The BrowserRouter is required for these test because Home contains "Links" from the same "react-router-dom" 
// which cannot work without being in a BrowserRouter that is contained in the index element in our app

const lessonData = [
  {name:"TestLessonPack0", index:0, calls:{true_call:"testCall0"}, lessonPairs:[{analysis_video: "test_analysis_video0.mp4", call_video: "test_call_video0.mp4"}]},
  {name:"TestLessonPack1", index:0, calls:{true_call:"testCall1"}, lessonPairs:[{analysis_video: "test_analysis_video1.mp4", call_video: "test_call_video1.mp4"}]}
]
const setLessonData = jest.fn();

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

test('Lesson Editor Link redirects', () => {
  render(
    <MemoryRouter initialEntries={["/admin-portal-web-app"]}>
      <Switch>
        <Route path="/admin-portal-web-app" component={Home}></Route>
        <LessonDataContext.Provider value={{lessonData, setLessonData}}>
          <Route path="/lesson-packs" component={LessonPacks} ></Route>
        </LessonDataContext.Provider>
      </Switch>
    </MemoryRouter>);

  const lessonLink = screen.getByTestId("lessonLink");
  lessonLink.click();
  const lessonPacksData = screen.getByText(/Lesson Packs/i);
  expect(lessonPacksData).toBeInTheDocument();
});

test('Analytics Dashboard Link redirects', () => {
  render(
    <MemoryRouter initialEntries={["/admin-portal-web-app"]}>
      <Switch>
        <Route path="/admin-portal-web-app" component={Home}></Route>
        <Route path="/analytics" component={Analytics} ></Route>
      </Switch>
    </MemoryRouter>);

  const analyticsLink = screen.getByTestId("analyticsLink");
  analyticsLink.click();
  const analyticsElement = screen.getByText(/Analytics/i);
  expect(analyticsElement).toBeInTheDocument();
});