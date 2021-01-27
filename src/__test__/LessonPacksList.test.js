import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import LessonPacksList from '../components/LessonPacksList';
import { LessonDataContext } from '../contexts/LessonDataContext'

const lessonData = [
  {name:"TestLessonPack0", index:0, calls:{true_call:"testCall0"}, lessonPairs:[{analysis_video: "test_analysis_video0.mp4", call_video: "test_call_video0.mp4"}]},
  {name:"TestLessonPack1", index:0, calls:{true_call:"testCall1"}, lessonPairs:[{analysis_video: "test_analysis_video1.mp4", call_video: "test_call_video1.mp4"}]}
]
const setLessonData = jest.fn();
const deleteLessonData = jest.fn();
window.confirm = jest.fn().mockImplementation(() => true)

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LessonDataContext.Provider value={{lessonData, setLessonData}}><LessonPacksList /></LessonDataContext.Provider>, div);
})

test("renders the first lesson pack", () => {
  render(<LessonDataContext.Provider value={{lessonData, setLessonData}}><LessonPacksList /></LessonDataContext.Provider>);
  const lessonPack0 = screen.getByText(/TestLessonPack0/i);
  expect(lessonPack0).toBeInTheDocument();
})

test("renders the second lesson pack", () => {
  render(<LessonDataContext.Provider value={{lessonData, setLessonData}}><LessonPacksList /></LessonDataContext.Provider>);
  const lessonPack1 = screen.getByText(/TestLessonPack1/i);
  expect(lessonPack1).toBeInTheDocument();
})

test("renders both lesson packs at the same time", () => {
  render(<LessonDataContext.Provider value={{lessonData, setLessonData}}><LessonPacksList /></LessonDataContext.Provider>);
  const lessonPack0 = screen.getByText(/TestLessonPack0/i);
  const lessonPack1 = screen.getByText(/TestLessonPack1/i);
  expect(lessonPack0).toBeInTheDocument();
  expect(lessonPack1).toBeInTheDocument();
})

test("Create Lesson Pack is on screen and clickable", () => {
  render(<LessonDataContext.Provider value={{lessonData, setLessonData}}><LessonPacksList /></LessonDataContext.Provider>);
  const createButton = screen.getByText(/Create Lesson Pack/i)
  createButton.click();
  expect(createButton).toBeInTheDocument();
})

test("Create Lesson Pack is on screen and clickable", () => {
  render(<LessonDataContext.Provider value={{lessonData, setLessonData}}><LessonPacksList /></LessonDataContext.Provider>);
  screen.getByText(/Create Lesson Pack/i).click();
  const newLessonPack = screen.getAllByText(/No name/i)[0];
  expect(newLessonPack).toBeInTheDocument();
})

test("Delete is on screen and clickable", () => {
  render(<LessonDataContext.Provider value={{lessonData, setLessonData}}><LessonPacksList /></LessonDataContext.Provider>);
  const deleteButton = screen.getAllByText(/Delete/i)[0]
  deleteButton.click();
  expect(deleteButton).toBeInTheDocument();
})

test("Delete will run handleRemove and remove lesson pack", () => {
  render(<LessonDataContext.Provider value={{lessonData, setLessonData, deleteLessonData}}><LessonPacksList /></LessonDataContext.Provider>);
  jest.spyOn(window, "confirm").mockImplementation(() => {return true});
  screen.getAllByText(/Delete/i)[0].click();
  expect(deleteLessonData).toBeCalled();
})
