import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import LessonPacks from '../components/LessonPacks';
import { LessonDataContext } from '../contexts/LessonDataContext'

//This componenet is a container and will have more to it later. Currently only has a header and a component that has been tested

const lessonData = [
  {name:"TestLessonPack0", index:0, calls:{true_call:"testCall0"}, lessonPairs:[{analysis_video: "test_analysis_video0.mp4", call_video: "test_call_video0.mp4"}]},
  {name:"TestLessonPack1", index:0, calls:{true_call:"testCall1"}, lessonPairs:[{analysis_video: "test_analysis_video1.mp4", call_video: "test_call_video1.mp4"}]}
]
const setLessonData = jest.fn();

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LessonDataContext.Provider value={{lessonData, setLessonData}}><LessonPacks /></LessonDataContext.Provider>, div);
})

test("renders Lesson Packs header", () => {
  render(<LessonDataContext.Provider value={{lessonData, setLessonData}}><LessonPacks /></LessonDataContext.Provider>);
  const headerElement = screen.getByText(/Lesson Packs/i);
  expect(headerElement).toBeInTheDocument();
})
