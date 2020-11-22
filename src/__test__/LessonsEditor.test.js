import { render, screen } from '@testing-library/react';
import LessonEditor from '../components/LessonEditor';

//setting up a mock version of firebase for testing
const mockSet = jest.fn();
mockSet.mockReturnValue(true);
jest.mock("firebase", () => ({
    initializeApp: jest.fn(),
    auth: () => ({
      onAuthStateChanged: jest.fn(path => ({
        set:mockSet
      })),
      signInWithEmailAndPassword: jest.fn(path => ({
        set: mockSet
      })),
      currentUser: jest.fn(path => ({
        set: mockSet
      }))
    })
}));


test('renders heading message', () => {
  render(<LessonEditor />);
  const linkElement = screen.getByText(/Lesson Editor/i);
  expect(linkElement).toBeInTheDocument();
});

//Due to secuirty reaons we are unable to automatically upload flies to the firebase storage
//Firebase also has no local storage emulator to test
