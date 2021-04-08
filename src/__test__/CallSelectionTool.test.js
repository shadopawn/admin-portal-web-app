import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import CallSelectionTool from '../components/CallSelectionTool';
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

let setCallText = jest.fn()

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LessonDataContext.Provider value={{setCallText}}><CallSelectionTool /></LessonDataContext.Provider>, div);
})

test("showCallModal is on screen and clickable", () => {
  render(<LessonDataContext.Provider value={{setCallText}}><CallSelectionTool /></LessonDataContext.Provider>);
  const addVideoButton = screen.getByTestId("btnAddCall");
  addVideoButton.click();
  expect(addVideoButton).toBeInTheDocument();
})

test("showCallModal function renders CallContainerModal", () => {
  render(<LessonDataContext.Provider value={{setCallText}}><CallSelectionTool /></LessonDataContext.Provider>);
  screen.getByTestId("btnAddCall").click();
  const videoContainerModal = screen.getByText(/What call/i);
  expect(videoContainerModal).toBeInTheDocument();
})

test('Expect firebase to not be called because it is not being shown', () => {
  render(<LessonDataContext.Provider value={{setCallText}}><CallSelectionTool /></LessonDataContext.Provider>);
  expect(mockEffect).toBeCalledTimes(0)
})

test('hideCallModal function to be called', () => {
  render(<LessonDataContext.Provider value={{setCallText}}><CallSelectionTool /></LessonDataContext.Provider>);
  screen.getByTestId("btnAddCall").click();
  screen.getByTestId("closeModal").click();
  expect(mockEffect).toHaveBeenCalled();
})
