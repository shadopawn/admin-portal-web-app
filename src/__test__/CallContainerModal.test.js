import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import CallContainerModal from '../components/CallContainerModal';

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
  ReactDOM.render(<CallContainerModal />, div);
})

test("renders hide without crashing", () => {
  render(<CallContainerModal show={false} />);
})

test("renders hide without crashing", () => {
  render(<CallContainerModal show={true} />);
})

test("renders message when show is true", () => {
  render(<CallContainerModal show={true} />);
  const message = screen.getByText(/What call would/i);
  expect(message).toBeInTheDocument();
})

test('Expect useEffect and firebase to be called', () => {
  render(<CallContainerModal show={true} />);
  expect(mockEffect).toHaveBeenCalled();
})

test('Close is on screen and clickable', () => {
  render(<CallContainerModal show={true} hide={hide}/>);
  const close = screen.getAllByText(/Close/i);
  close[0].click();
  expect(close[0]).toBeInTheDocument();
})

test('Expect to close to have been called', () => {
  render(<CallContainerModal show={true} hide={hide}/>);
  screen.getByTestId("closeModal").click();
  expect(hide).toHaveBeenCalled();
})

test('Expect useEffect and firebase to not be called because it is not being shown', () => {
  render(<CallContainerModal show={false} />);
  expect(mockEffect).toBeCalledTimes(0)
})