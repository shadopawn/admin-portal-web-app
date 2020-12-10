import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import LessonPair from '../components/LessonPair';
import {LessonDataContext} from '../contexts/LessonDataContext';

//setting up a mock version of firebase for testing
const mockEffect = jest.fn();
jest.mock("firebase", () => ({
  initializeApp: jest.fn(),
  storage: () => ({
    ref: () => ({
      listAll: () => ({
        then: jest.fn(path => ({
          catch:mockEffect
        }))
      })
    })
  })
}));

const lessonPair = {analysis_video: "test_analysis_video.mp4", call_video: "test_call_video.mp4"}
const currentLessonPack = {name:"testName", calls:{true_call:"testCall"}, lessonPairs:[{analysis_video: "test_analysis_video.mp4", call_video: "test_call_video.mp4"}]}
let setCallText = jest.fn()
let mockRender = jest.fn()
let mockDelete = jest.fn()

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair lessonPair={lessonPair} /></LessonDataContext.Provider>, div);
})

test("will rerender when changes are made without crashing", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false}/></LessonDataContext.Provider>);
  screen.getByTestId("btnCallSelection").click()
})

test("rerender will be called", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false}/></LessonDataContext.Provider>);
  screen.getByTestId("btnCallSelection").click();
  expect(mockRender).toBeCalled();
})

test("will render the correct Lesson Pair and index", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false}/></LessonDataContext.Provider>);
  //Although given 0, we add one to the index when displaying so that it doesn't show Lesson Pair 0
  const pairElement = screen.getByText(/Lesson Pair 1/i);
  expect(pairElement).toBeInTheDocument();
})

test("deletePair will be called", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false} deletePair={mockDelete} /></LessonDataContext.Provider>);
  screen.getByTestId("btnDeletePair").click();
  expect(mockDelete).toBeCalled();
})

test("renders VideoContainerModal when clicking Add Video", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false} deletePair={mockDelete} /></LessonDataContext.Provider>);
  screen.getAllByTestId("btnAddVideo")[0].click();
  const videoContainerModal = screen.getAllByText(/What video/i);
  expect(videoContainerModal[0]).toBeInTheDocument();
})

test("will render the correct Call Video", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false}/></LessonDataContext.Provider>);
  const callVideoElement = screen.getByText(/Call Video: test_call_video.mp4/i);
  expect(callVideoElement).toBeInTheDocument();
})

test("will render the correct Analysis Video", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false}/></LessonDataContext.Provider>);
  const analysisVideoElement = screen.getByText(/Analysis Video: test_analysis_video.mp4/i);
  expect(analysisVideoElement).toBeInTheDocument();
})

test("Call will have the correct UID given", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false}/></LessonDataContext.Provider>);
  const callElement = document.getElementById("true_call0")
  expect(callElement).toBeInTheDocument();
})