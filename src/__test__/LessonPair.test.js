import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import LessonPair from '../components/LessonPair';
import {LessonDataContext} from '../contexts/LessonDataContext';

const lessonPair = {analysis_video: "test_analysis_video.mp4", call_video: "test_call_video.mp4"}
let setCallText = jest.fn()
const currentLessonPack = {name:"testName", calls:{true_call:"testCall"}, lessonPairs:[]}
let mockRender = jest.fn()

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair lessonPair={lessonPair} /></LessonDataContext.Provider>, div);
})

test("renders without crashing", () => {
  render(<LessonDataContext.Provider value={{setCallText, currentLessonPack}}><LessonPair lessonPair={lessonPair} rerender={mockRender} render={false}/></LessonDataContext.Provider>);
  screen.getByTestId("btnCallSelection").click()

})