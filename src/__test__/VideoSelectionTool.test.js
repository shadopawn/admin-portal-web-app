import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import VideoSelectionTool from '../components/VideoSelectionTool';
import {LessonDataContext} from '../contexts/LessonDataContext';

//setting up a mock version of firebase for testing
const mockHide = jest.fn();
const mockEffect = jest.fn();
mockHide.mockReturnValue(true);
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

let setVideoFileName = jest.fn()

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LessonDataContext.Provider value={{setVideoFileName}}><VideoSelectionTool /></LessonDataContext.Provider>, div);
})

test("showVideoModal is on screen and clickable", () => {
  render(<LessonDataContext.Provider value={{setVideoFileName}}><VideoSelectionTool /></LessonDataContext.Provider>);
  const addVideoButton = screen.getByTestId("btnAddVideo");
  addVideoButton.click();
  expect(addVideoButton).toBeInTheDocument();
})

test("showVideoModal function renders VideoContainerModal", () => {
  render(<LessonDataContext.Provider value={{setVideoFileName}}><VideoSelectionTool /></LessonDataContext.Provider>);
  screen.getByTestId("btnAddVideo").click();
  const videoContainerModal = screen.getByText(/What video/i);
  expect(videoContainerModal).toBeInTheDocument();
})

test('Expect firebase to not be called because it is not being shown', () => {
  render(<LessonDataContext.Provider value={{setVideoFileName}}><VideoSelectionTool /></LessonDataContext.Provider>);
  expect(mockEffect).toBeCalledTimes(0)
})

test('hideVideoModal function to be called', () => {
  render(<LessonDataContext.Provider value={{setVideoFileName}}><VideoSelectionTool /></LessonDataContext.Provider>);
  screen.getByTestId("btnAddVideo").click();
  screen.getByTestId("closeVModal").click();
  expect(mockEffect).toHaveBeenCalled();
})
