import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import VideoContainerModal from '../components/VideoContainerModal';
import firebase from 'firebase'

//setting up a mock version of firebase for testing
const mockSet = jest.fn();
mockSet.mockReturnValue(true);
jest.mock("firebase", () => ({
  initializeApp: jest.fn(),
  storage: () => ({
    ref: () => ({
      listAll: () => ({
        then: jest.fn(path => ({
          catch:mockSet
        }))
      })
    })
  })
}));

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<VideoContainerModal />, div);
})

test("renders hide without crashing", () => {
  render(<VideoContainerModal show={false} />);
})

test("renders hide without crashing", () => {
  render(<VideoContainerModal show={true} />);
})