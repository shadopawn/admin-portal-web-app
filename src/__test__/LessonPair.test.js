import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import LessonPair from '../components/LessonPair';
import {LessonDataContext} from '../contexts/LessonDataContext';

//setting up a mock version of firebase for testing
const mockEffect = jest.fn();
const mockDownload = jest.fn();
jest.mock("firebase", () => ({
  initializeApp: jest.fn(),
  storage: () => ({
    ref: () => ({
      listAll: () => ({
        then: jest.fn(path => ({
          catch:mockEffect
        }))
      }),
      getDownloadURL: () => ({
        then: mockDownload
      })
    })
  })
}));

const lessonPair = {analysis_video: "test_analysis_video.mp4", call_video: "test_call_video.mp4", name:"Lesson Pair 1", calls:{true_call:"testCall", false_call1:"FalseCall", false_call0:"FalseCall"}}
let currentLessonPack = {name:"testName", calls:{true_call:"testCall"}, lessonPairs:[{analysis_video: "test_analysis_video.mp4", call_video: "test_call_video.mp4", name:"Lesson Pair 1", calls:{true_call:"testCall", false_call1:"FalseCall", false_call0:"FalseCall"}}]}
let setCallText = jest.fn()
let mockRender = jest.fn()
let mockDelete = jest.fn()

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} deletePair={mockDelete}/></LessonDataContext.Provider>, div);
})

test("will rerender when changes are made without crashing", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false} deletePair={mockDelete}/></LessonDataContext.Provider>);
  screen.getAllByTestId("btnCallSelection")[0].click()
})

test("rerender will be called", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false} deletePair={mockDelete}/></LessonDataContext.Provider>);
  screen.getAllByTestId("btnCallSelection")[0].click();
  expect(mockRender).toBeCalled();
})

test("delete is on screen and clickable", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false} deletePair={mockDelete}/></LessonDataContext.Provider>);
  const deleteButton = screen.getByText(/Delete/i)
  deleteButton.click();
  expect(deleteButton).toBeInTheDocument();
})

test("delete will be called", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false} deletePair={mockDelete}/></LessonDataContext.Provider>);
  screen.getAllByTestId("btnDeletePair")[0].click();
  expect(mockDelete).toBeCalled();
})

test("will render the correct Lesson Pair and index", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false} deletePair={mockDelete}/></LessonDataContext.Provider>);
  //Although given 0, we add one to the index when displaying so that it doesn't show Lesson Pair 0
  const pairElement = screen.getByText(/Lesson Pair 1/i);
  expect(pairElement).toBeInTheDocument();
})

test("renders VideoContainerModal when clicking Add Video", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false} deletePair={mockDelete} /></LessonDataContext.Provider>);
  screen.getAllByTestId("btnAddVideo")[0].click();
  const videoContainerModal = screen.getAllByText(/What video/i);
  expect(videoContainerModal[0]).toBeInTheDocument();
})

test("will render the correct Call Video", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false} deletePair={mockDelete}/></LessonDataContext.Provider>);
  const callVideoElement = screen.getByText(/test_call_video/i);
  expect(callVideoElement).toBeInTheDocument();
})

test("will render the correct Analysis Video", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false} deletePair={mockDelete}/></LessonDataContext.Provider>);
  const analysisVideoElement = screen.getByText(/test_analysis_video/i);
  expect(analysisVideoElement).toBeInTheDocument();
})

test("will query database for firebase images", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false} deletePair={mockDelete}/></LessonDataContext.Provider>);
  expect(mockDownload).toBeCalled();
})

test("change name is on screen able clickable", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair index={0} lessonPair={lessonPair} rerender={mockRender} render={false} deletePair={mockDelete}/></LessonDataContext.Provider>);
  screen.getAllByText(/Edit Name/i)[0].click();
  const nameElement = screen.getByText(/the name to be?/i);
  expect(nameElement).toBeInTheDocument();
})
