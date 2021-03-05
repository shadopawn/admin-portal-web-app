import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import VideoPairSelection from '../components/VideoPairSelection';
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

const lessonPair = {analysis_video: "test_analysis_video.mp4", call_video: "test_call_video.mp4", calls:{true_call:"testTrueCall", false_call0:"testFalseCall0", false_call1:"testFalseCall1"}}
let currentLessonPack = {name:"testName", calls:{true_call:"testCall"}, lessonPairs:[{analysis_video: "test_analysis_video.mp4", call_video: "test_call_video.mp4", calls:{true_call:"testCall", false_call1:"FalseCall"}}]}
let setCallText = jest.fn()
let setHandle = jest.fn()

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><VideoPairSelection index={0} videoType="analysis" lessonPair={lessonPair}/></LessonDataContext.Provider>, div);
})

test('renders the correct analysis video pre-text', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><VideoPairSelection index={0} videoType="analysis" lessonPair={lessonPair} /></LessonDataContext.Provider>);
  const analysisElement = screen.getByText(/analysis Video/i);
  expect(analysisElement).toBeInTheDocument();
});

test('renders the correct call video pre-text', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><VideoPairSelection index={0} videoType="call" lessonPair={lessonPair} /></LessonDataContext.Provider>);
  const callElement = screen.getByText(/call Video/i);
  expect(callElement).toBeInTheDocument();
});

test('renders the correct analysis video value', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><VideoPairSelection index={0} videoType="analysis" lessonPair={lessonPair} /></LessonDataContext.Provider>);
  const analysisElement = screen.getByText(/test_analysis_video/i);
  expect(analysisElement).toBeInTheDocument();
});
  
test('renders the correct call video value', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><VideoPairSelection index={0} videoType="call" lessonPair={lessonPair} /></LessonDataContext.Provider>);
  const callElement = screen.getByText(/test_call_video/i);
  expect(callElement).toBeInTheDocument();
});

test("showCallModal is on screen and clickable", () => {
    render(<LessonDataContext.Provider value={{setCallText}}><VideoPairSelection index={0} videoType="call" lessonPair={lessonPair} handleSelection={setHandle} /></LessonDataContext.Provider>);
    const addVideoButton = screen.getByTestId("btnAddVideo");
    addVideoButton.click();
    expect(addVideoButton).toBeInTheDocument();
  })
  
  test("showCallModal function renders VideoContainerModal", () => {
    render(<LessonDataContext.Provider value={{setCallText}}><VideoPairSelection index={0} videoType="call" lessonPair={lessonPair} handleSelection={setHandle} /></LessonDataContext.Provider>);
    screen.getByTestId("btnAddVideo").click();
    const videoContainerModal = screen.getByText(/What video/i);
    expect(videoContainerModal).toBeInTheDocument();
  })