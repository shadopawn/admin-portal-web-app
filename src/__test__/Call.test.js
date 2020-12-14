import React from 'react'
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Call from '../components/Call';
import {LessonDataContext} from '../contexts/LessonDataContext';

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
const currentLessonPack = {name:"testName", lessonPairs:[{calls:{true_call:"testCall", false_call1:"FalseCall"}}]}

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
  ReactDOM.render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><Call callType={"false_call0"} callBool={"False"} index={0} /></LessonDataContext.Provider>, div);
})

test('renders true call message', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><Call callType={"true_call"} callBool={"True"} index={0} /></LessonDataContext.Provider>);
  const callElement = screen.getByText(/True call:/i);
  expect(callElement).toBeInTheDocument();
});

test('renders false call message', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><Call callType={"false_call1"} callBool={"False"} index={0} /></LessonDataContext.Provider>);
  const callElement = screen.getByText(/False call:/i);
  expect(callElement).toBeInTheDocument();
});

test('generating correct UID', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><Call callType={"true_call"} callBool={"True"} index={0} /></LessonDataContext.Provider>);
  const callElement = document.getElementById("true_call0");
  expect(callElement).toBeInTheDocument();
});

test('generating correct placeholder', () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><Call callType={"true_call"} callBool={"True"} index={0} /></LessonDataContext.Provider>);
  const callElement = document.getElementById("true_call0").placeholder;
  expect(callElement).toBe("testCall")
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
  setCallText = (index, callType, callText) => {currentLessonPack.lessonPairs[index].calls[callType] = callText}
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><Call callType={"true_call"} callBool={"True"} index={0} /></LessonDataContext.Provider>);
  document.getElementById("true_call0").value = "newCall";
  const input = document.getElementById("true_call0");
  const event = new Event("input", { bubbles: true });
  const tracker = input._valueTracker;
  if (tracker) {
    tracker.setValue("value");
  }
  input.dispatchEvent(event);
  expect(currentLessonPack.lessonPairs[0].calls["true_call"]).toBe("newCall")
});

