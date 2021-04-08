import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import LessonPacks from '../components/LessonPacks';
import { LessonDataContext } from '../contexts/LessonDataContext'

//This component is mostly a container
const host = "localhost:3000/"
const mockSet = jest.fn();
const setLessonData = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: host + "home"
  }),
  useHistory: () => ({
    push: mockSet
  })
}));

const lessonData = [
  {name:"TestLessonPack0", index:0, calls:{true_call:"testCall0"}, lessonPairs:[{analysis_video: "test_analysis_video0.mp4", call_video: "test_call_video0.mp4"}]},
  {name:"TestLessonPack1", index:0, calls:{true_call:"testCall1"}, lessonPairs:[{analysis_video: "test_analysis_video1.mp4", call_video: "test_call_video1.mp4"}]}
]

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LessonDataContext.Provider value={{lessonData, setLessonData}}><LessonPacks /></LessonDataContext.Provider>, div);
})

test("renders Lesson Packs header", () => {
  render(<LessonDataContext.Provider value={{lessonData, setLessonData}}><LessonPacks /></LessonDataContext.Provider>);
  const headerElement = screen.getByText(/Lesson Packs/i);
  expect(headerElement).toBeInTheDocument();
})

test("upload button is on screen and clickable", () => {
  render(<LessonDataContext.Provider value={{lessonData, setLessonData}}><LessonPacks /></LessonDataContext.Provider>);
  const uploadElement = screen.getByText(/Upload videos/i);
  uploadElement.click();
  expect(uploadElement).toBeInTheDocument();
})

test("upload button will redirect", () => {
  render(<LessonDataContext.Provider value={{lessonData, setLessonData}}><LessonPacks /></LessonDataContext.Provider>);
  const uploadElement = screen.getByText(/Upload videos/i);
  uploadElement.click();
  expect(mockSet).toBeCalled();
})
