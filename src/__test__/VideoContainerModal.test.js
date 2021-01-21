import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import VideoContainerModal from '../components/VideoContainerModal';

//setting up a mock version of firebase for testing
const hide = jest.fn();
const mockEffect = jest.fn();
hide.mockReturnValue(true);
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

test("renders message when show is true", () => {
  render(<VideoContainerModal show={true} />);
  const message = screen.getByText(/What video/i);
  expect(message).toBeInTheDocument();
})

test('Expect useEffect and firebase to be called', () => {
  render(<VideoContainerModal show={true} />);
  expect(mockEffect).toHaveBeenCalled();
})

test('Close is on screen and clickable', () => {
  render(<VideoContainerModal show={true} hide={hide}/>);
  const close = screen.getAllByText(/Close/i);
  close[0].click();
  expect(close[0]).toBeInTheDocument();
})

test('Expect to close to have been called', () => {
  render(<VideoContainerModal show={true} hide={hide}/>);
  screen.getByTestId("closeVModal").click();
  expect(hide).toHaveBeenCalled();
})

test('Expect useEffect and firebase to not be called because it is not being shown', () => {
  render(<VideoContainerModal show={false} />);
  expect(mockEffect).toBeCalledTimes(0)
})