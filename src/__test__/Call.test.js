import React, {createContext} from 'react'
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Call from '../components/Call';
import LessonContextProvider, {LessonDataContext} from '../contexts/LessonDataContext';

//setting up a mock version of firebase for testing
const mockSet = jest.fn();
mockSet.mockReturnValue(true);
jest.mock("firebase", () => ({
  initializeApp: jest.fn(),
  database: () => ({
    ref: () => ({
      once: () => ({
        then: jest.fn(path => ({
          set:mockSet
        }))
      })
    })
  })
}));

let setCallText = jest.fn()
const currentLessonPack = {name:"testName", calls:{true_call:"testCall"}, lessonPairs:[]}

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><Call callType={"true_call"} callBool={"True"} index={0} /></LessonDataContext.Provider>, div);
})

test("renders different calls without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><Call callType={"false_call0"} callBool={"False"} index={0} /></LessonDataContext.Provider>, div);
})

test("renders index without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><Call callType={"false_call0"} callBool={"False"} index={2} /></LessonDataContext.Provider>, div);
})

test('renders true call message', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><Call callType={"true_call"} callBool={"True"} index={2} /></LessonDataContext.Provider>);
  const linkElement = screen.getByText(/True call:/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders false call message', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><Call callType={"false_call1"} callBool={"False"} index={1} /></LessonDataContext.Provider>);
  const linkElement = screen.getByText(/False call:/i);
  expect(linkElement).toBeInTheDocument();
});

test('generating correct UID', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><Call callType={"true_call"} callBool={"True"} index={0} /></LessonDataContext.Provider>);
  const linkElement = document.getElementById("true_call0");
  expect(linkElement).toBeInTheDocument();
});

test('generating correct placeholder', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><Call callType={"true_call"} callBool={"True"} index={0} /></LessonDataContext.Provider>);
  const linkElement = document.getElementById("true_call0").placeholder;
  expect(linkElement).toBe("testCall")
});

it("update call function can be called",  () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><Call callType={"true_call"} callBool={"True"} index={0} /></LessonDataContext.Provider>);
  const input = document.getElementById("true_call0");
  const event = new Event("input", { bubbles: true });
  const tracker = input._valueTracker;
  if (tracker) {
    tracker.setValue("value");
  }
  input.dispatchEvent(event);
  expect(setCallText).toHaveBeenCalled();
});

it("update call function will change the call",  () => {
  setCallText = (callType, callText) => {currentLessonPack.calls[callType] = callText}
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><Call callType={"true_call"} callBool={"True"} index={0} /></LessonDataContext.Provider>);
  document.getElementById("true_call0").value = "newCall";
  const input = document.getElementById("true_call0");
  const event = new Event("input", { bubbles: true });
  const tracker = input._valueTracker;
  if (tracker) {
    tracker.setValue("value");
  }
  input.dispatchEvent(event);
  expect(currentLessonPack.calls["true_call"]).toBe("newCall")
});

