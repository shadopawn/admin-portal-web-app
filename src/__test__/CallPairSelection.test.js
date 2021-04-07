import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import CallPairSelection from '../components/CallPairSelection';
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
      }),
      getDownloadURL: () => ({
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
  ReactDOM.render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><CallPairSelection index={0} callType="true_call" lessonPair={lessonPair}/></LessonDataContext.Provider>, div);
})

test('renders the correct true_call pre-text', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><CallPairSelection index={0} callType="true_call" lessonPair={lessonPair} /></LessonDataContext.Provider>);
  const callElement = screen.getByText(/True Call:/i);
  expect(callElement).toBeInTheDocument();
});

test('renders the correct false_call0 pre-text', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><CallPairSelection index={0} callType="false_call0" lessonPair={lessonPair} /></LessonDataContext.Provider>);
  const callElement = screen.getByText(/False Call 1:/i);
  expect(callElement).toBeInTheDocument();
});

test('renders the correct false_call1 pre-text', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><CallPairSelection index={0} callType="false_call1" lessonPair={lessonPair} /></LessonDataContext.Provider>);
  const callElement = screen.getByText(/False Call 2:/i);
  expect(callElement).toBeInTheDocument();
});

test('renders the correct true_call call', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><CallPairSelection index={0} callType="true_call" lessonPair={lessonPair} /></LessonDataContext.Provider>);
  const callElement = screen.getByText(/testTrueCall/i);
  expect(callElement).toBeInTheDocument();
});
  
test('renders the correct false_call0 call', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><CallPairSelection index={0} callType="false_call0" lessonPair={lessonPair} /></LessonDataContext.Provider>);
  const callElement = screen.getByText(/testFalseCall0/i);
  expect(callElement).toBeInTheDocument();
});
  
test('renders the correct false_call1 call', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><CallPairSelection index={0} callType="false_call1" lessonPair={lessonPair} /></LessonDataContext.Provider>);
  const callElement = screen.getByText(/testFalseCall1/i);
  expect(callElement).toBeInTheDocument();
});

test("showCallModal is on screen and clickable", () => {
  render(<LessonDataContext.Provider value={{setCallText}}><CallPairSelection index={0} callType="false_call1" lessonPair={lessonPair} handleSelection={setHandle} /></LessonDataContext.Provider>);
  const addCallButton = screen.getByTestId("btnAddCall");
  addCallButton.click();
  expect(addCallButton).toBeInTheDocument();
})

test("showCallModal function renders CallContainerModal", () => {
  render(<LessonDataContext.Provider value={{setCallText}}><CallPairSelection index={0} callType="false_call1" lessonPair={lessonPair} handleSelection={setHandle} /></LessonDataContext.Provider>);
  screen.getByTestId("btnAddCall").click();
  const callContainerModal = screen.getByText(/What call/i);
  expect(callContainerModal).toBeInTheDocument();
})