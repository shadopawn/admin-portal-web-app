import { render, screen } from '@testing-library/react';
import LessonEditor from '../components/LessonEditor';

test('renders heading message', () => {
  render(<LessonEditor />);
  const linkElement = screen.getByText(/Lesson Editor/i);
  expect(linkElement).toBeInTheDocument();
});