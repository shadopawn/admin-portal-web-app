import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import LessonTree from '../components/LessonTree';
import {LessonDataContext} from '../contexts/LessonDataContext';
import { BrowserRouter } from 'react-router-dom';

let setNameText = jest.fn()
let currentLessonPack = {name:"testName", calls:{true_call:"testCall"}, lessonPairs:[{analysis_video: "test_analysis_video.mp4", call_video: "test_call_video.mp4"}]}

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LessonDataContext.Provider value={{setNameText, currentLessonPack}}><LessonTree /></LessonDataContext.Provider>, div);
})

test("renders the correct Lesson Pack Name", () => {
  render(<LessonDataContext.Provider value={{setNameText, currentLessonPack}}><LessonTree /></LessonDataContext.Provider>);
  const packElement = screen.getByText(/testName/i);
  expect(packElement).toBeInTheDocument();
})

test("redirects when there is no currentLessonPack", () => {
  let currentLessonPack = false
  render(<BrowserRouter><LessonDataContext.Provider value={{setNameText, currentLessonPack}}><LessonTree /></LessonDataContext.Provider></BrowserRouter>);
  const packElement = screen.queryByTestId("packName")
  expect(packElement).toBeNull()
})

test("renders the correct Lesson Pair given", () => {
  render(<LessonDataContext.Provider value={{setNameText, currentLessonPack}}><LessonTree /></LessonDataContext.Provider>);
  const analysisElement = screen.getByText(/test_analysis_video.mp4/i);
  const callElement = screen.getByText(/test_call_video.mp4/i);
  expect(analysisElement).toBeInTheDocument();
  expect(callElement).toBeInTheDocument();
})

test("Edit Name is on screen and clickable", () => {
  render(<LessonDataContext.Provider value={{setNameText, currentLessonPack}}><LessonTree /></LessonDataContext.Provider>);
  const editButton = screen.getByText(/Edit Name/i);
  editButton.click();
  expect(editButton).toBeInTheDocument();
})

test("Edit Name will bring up the Name Modal", () => {
  render(<LessonDataContext.Provider value={{setNameText, currentLessonPack}}><LessonTree /></LessonDataContext.Provider>);
  screen.getByText(/Edit Name/i).click();
  const nameModal = screen.getByText(/like the name to be/i);
  expect(nameModal).toBeInTheDocument();
})

test("Submit is on screen and clickable", () => {
  render(<LessonDataContext.Provider value={{setNameText, currentLessonPack}}><LessonTree /></LessonDataContext.Provider>);
  const submitButton = screen.getByText(/Submit/i);
  submitButton.click();
  expect(submitButton).toBeInTheDocument();
})

test("Submit will run setNameText", () => {
  render(<LessonDataContext.Provider value={{setNameText, currentLessonPack}}><LessonTree /></LessonDataContext.Provider>);
  screen.getByText(/Submit/i).click();
  expect(setNameText).toBeCalled();
})

test("Edit Name is on screen and clickable", () => {
  render(<LessonDataContext.Provider value={{setNameText, currentLessonPack}}><LessonTree /></LessonDataContext.Provider>);
  screen.getByText(/Add Lesson Pair/i).click();
})

test("renders a new Lesson Pair", () => {
  render(<LessonDataContext.Provider value={{setNameText, currentLessonPack}}><LessonTree /></LessonDataContext.Provider>);
  screen.getByTestId("btnAddPair").click();
  const placeholderElement = screen.getAllByText(/placeholder/i)[0];
  expect(placeholderElement).toBeInTheDocument();
})

test("Able to delete lesson", () => {
  render(<LessonDataContext.Provider value={{setNameText, currentLessonPack}}><LessonTree /></LessonDataContext.Provider>);
  screen.getAllByTestId("btnDeletePair")[0].click()
  const lessonElement = screen.queryByText(/test_analysis_video.mp4/i)
  expect(lessonElement).toBeNull()
})

