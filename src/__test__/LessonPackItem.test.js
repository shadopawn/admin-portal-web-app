import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import LessonPackItem from '../components/LessonPackItem';
import { LessonDataContext } from '../contexts/LessonDataContext'

const host = "localhost:3000/"
let uploadCurrentLesson = jest.fn()
let setCurrentLessonPack = jest.fn()
const mockDelete = jest.fn()
const mockSet = jest.fn()
const lessonPack = {name:"TestLessonPack", index:0, calls:{true_call:"testCall"}, lessonPairs:[{analysis_video: "test_analysis_video.mp4", call_video: "test_call_video.mp4"}]}

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: host + "home"
  }),
  useHistory: () => ({
    push: mockSet
  })
}));

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LessonDataContext.Provider value={{setCurrentLessonPack, uploadCurrentLesson}}>
    <table>
      <tbody>
        <LessonPackItem lessonPack={lessonPack} />
      </tbody>
    </table>
  </LessonDataContext.Provider>, div);
})

test("renders the correct Lesson Pack Name", () => {
  render(<LessonDataContext.Provider value={{setCurrentLessonPack, uploadCurrentLesson}}>
    <table>
      <tbody>
        <LessonPackItem lessonPack={lessonPack} />
      </tbody>
    </table>
  </LessonDataContext.Provider>);
  const packElement = screen.getByText(/TestLessonPack/i);
  expect(packElement).toBeInTheDocument();
})

test("will run deleteItem", () => {
  render(<LessonDataContext.Provider value={{setCurrentLessonPack, uploadCurrentLesson}}>
    <table>
      <tbody>
        <LessonPackItem lessonPack={lessonPack} deleteItem={mockDelete} />
      </tbody>
    </table>
  </LessonDataContext.Provider>);
  screen.getByTestId("btnPackDelete").click();
  expect(mockDelete).toHaveBeenCalled();
})

test("will run publishPack", () => {
  render(<LessonDataContext.Provider value={{setCurrentLessonPack, uploadCurrentLesson}}>
    <table>
      <tbody>
        <LessonPackItem lessonPack={lessonPack} deleteItem={mockDelete} />
      </tbody>
    </table>
  </LessonDataContext.Provider>);
  screen.getByTestId("btnPublishPack").click();
  expect(uploadCurrentLesson).toHaveBeenCalled();
})

test("will run redirect", () => {
  render(<LessonDataContext.Provider value={{setCurrentLessonPack, uploadCurrentLesson}}>
    <table>
      <tbody>
        <LessonPackItem lessonPack={lessonPack} deleteItem={mockDelete} />
      </tbody>
    </table>
  </LessonDataContext.Provider>);
  screen.getByTestId("btnEditPack").click();
  expect(setCurrentLessonPack).toHaveBeenCalled();
})

test("will run redirect", () => {
  render(<LessonDataContext.Provider value={{setCurrentLessonPack, uploadCurrentLesson}}>
    <table>
      <tbody>
        <LessonPackItem lessonPack={lessonPack} deleteItem={mockDelete} />
      </tbody>
    </table>
  </LessonDataContext.Provider>);
  screen.getByTestId("btnEditPack").click();
  expect(setCurrentLessonPack).toHaveBeenCalled();
})