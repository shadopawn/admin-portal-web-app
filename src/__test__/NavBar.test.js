import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Switch, Route } from 'react-router-dom';
import { LessonDataContext } from '../contexts/LessonDataContext'
import LessonPacks from '../components/LessonPacks';
import Analytics from '../components/Analytics';
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Home from '../components/Home';

//setting up a mock version of firebase for testing
const mockSet = jest.fn();
const mockSignOut = jest.fn();
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
      })),
      ref: mockSignOut,
      signOut: mockSignOut
    })
  }));

  const mockHistoryPush = jest.fn();

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }));

const lessonData = [
  {name:"TestLessonPack0", index:0, calls:{true_call:"testCall0"}, lessonPairs:[{analysis_video: "test_analysis_video0.mp4", call_video: "test_call_video0.mp4"}]},
  {name:"TestLessonPack1", index:0, calls:{true_call:"testCall1"}, lessonPairs:[{analysis_video: "test_analysis_video1.mp4", call_video: "test_call_video1.mp4"}]}
]
const setLessonData = jest.fn();

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowserRouter><NavBar /></BrowserRouter>, div);
})

test('Analytics Dashboard Link redirects', () => {
  render(
    <MemoryRouter>
      <NavBar />
      <Switch>
        <Route path="/analytics" component={Analytics} ></Route>
      </Switch>
    </MemoryRouter>);

  const analyticsLink = screen.getByTestId("analyticsLink");
  analyticsLink.click();
  const analyticsHeader = screen.getByText(/Analytics/i);
  expect(analyticsHeader).toBeInTheDocument();
});

test('Lesson Editor Link redirects', () => {
  render(
    <MemoryRouter>
      <NavBar />
      <Switch>
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
  const location = {
    pathname: '/admin-portal-web-app',
    state: { fromDashboard: true }
  }

  render(
    <MemoryRouter>
      <NavBar />
      <Switch>
        <Route path="/login">
          <Login to={location}></Login>
        </Route>
      </Switch>
    </MemoryRouter>);

  const loginLink = screen.getByTestId("loginLink");
  loginLink.click();
  const loginHeader = screen.getByText(/Admin Portal Log in/i);
  expect(loginHeader).toBeInTheDocument();
});

test('Logout button is on screen and clickable', () => {
  render(
    <MemoryRouter>
      <NavBar />
      <Switch>
        <Route path="/admin-portal-web-app" component={Home} ></Route>
      </Switch>
    </MemoryRouter>);

  const logoutButton = screen.getByText(/Log out/i);
  logoutButton.click();
  expect(logoutButton).toBeInTheDocument();
});

test('Logout button runs LogoutEventListen', () => {
  const location = {
    pathname: '/admin-portal-web-app',
    state: { fromDashboard: true }
  } 
  render(
    <MemoryRouter>
      <NavBar to={location}/>
      <Switch>
        <Route path="/admin-portal-web-app" component={Home} ></Route>
      </Switch>
    </MemoryRouter>);

  const logoutButton = screen.getByText(/Log out/i);
  logoutButton.click();
  expect(mockSignOut).toBeCalled()
});

test('Logout button run redirect with correct path', () => {
  const location = {
    pathname: '/admin-portal-web-app',
    state: { fromDashboard: true }
  } 
  render(
    <MemoryRouter initialEntries={["/analytics"]}>
      <NavBar to={location}/>
      <Switch>
        <Route path="/admin-portal-web-app" component={Home} ></Route>
        <Route path="/analytics" component={Analytics} ></Route>
      </Switch>
    </MemoryRouter>);

  const logoutButton = screen.getByText(/Log out/i);
  logoutButton.click();
  expect(mockHistoryPush).toHaveBeenCalledWith("/admin-portal-web-app")
});