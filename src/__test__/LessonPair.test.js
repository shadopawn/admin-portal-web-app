import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import LessonPair from '../components/LessonPair';
import Analytics from '../components/Analytics';

const lessonPair = {analysis_video: "test_analysis_video.mp4", call_video: "test_call_video.mp4"}
test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Analytics />, div);
})