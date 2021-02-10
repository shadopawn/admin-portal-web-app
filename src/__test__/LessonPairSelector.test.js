import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import LessonPairSelector from '../components/LessonPairSelector';

let mockDelete = jest.fn()
const lessonPair = {analysis_video: "test_analysis_video.mp4", call_video: "test_call_video.mp4", name:"Lesson Pair 1", calls:{true_call:"testCall", false_call1:"FalseCall", false_call0:"FalseCall"}}


test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LessonPairSelector lessonPair={lessonPair} />, div);
});

test('renders Lesson Pair text', () => {
  render(<LessonPairSelector lessonPair={lessonPair} />);
  const lessonText = screen.getByText(/Lesson Pair/i);
  expect(lessonText).toBeInTheDocument();
});

test('renders correct Lesson Pair text', () => {
  render(<LessonPairSelector lessonPair={lessonPair} />);
  const lessonText = screen.getByText(/Lesson Pair 1/i);
  expect(lessonText).toBeInTheDocument();
});
