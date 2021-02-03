import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import LessonPairSelector from '../components/LessonPairSelector';

let mockDelete = jest.fn()

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LessonPairSelector />, div);
});

test('renders Lesson Pair text', () => {
  render(<LessonPairSelector />);
  const lessonText = screen.getByText(/Lesson Pair/i);
  expect(lessonText).toBeInTheDocument();
});

test('renders correct Lesson Pair index', () => {
  render(<LessonPairSelector index={2} />);
  const lessonText = screen.getByText(/Lesson Pair 3/i);
  expect(lessonText).toBeInTheDocument();
});

test('deletePair is rendered and clickable', () => {
  render(<LessonPairSelector index={2} deletePair={mockDelete} />);
  const deleteButton = screen.getAllByText(/Delete/i)[0]
  deleteButton.click();
  expect(deleteButton).toBeInTheDocument();
});

test('deletePair will be called', () => {
  render(<LessonPairSelector index={2} deletePair={mockDelete} />);
  screen.getByTestId("btnDeletePair").click();
  expect(mockDelete).toBeCalled();
});