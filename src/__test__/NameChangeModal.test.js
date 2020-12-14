import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import NameChangeModal from '../components/NameChangeModal';

const hide = jest.fn();
const changeName = jest.fn();

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NameChangeModal />, div);
})

test("renders hide without crashing", () => {
  render(<NameChangeModal show={false} />);
})

test("renders hide without crashing", () => {
  render(<NameChangeModal show={true} />);
})

test("renders message when show is true", () => {
  render(<NameChangeModal show={true} />);
  const message = screen.getByText(/What would you like the name to be/i);
  expect(message).toBeInTheDocument();
})

test("Close is on screen and clickable", () => {
  render(<NameChangeModal show={true} hide={hide} changeName={changeName}/>);
  const closeButton = screen.getByText(/Close/i)
  closeButton.click();
  expect(closeButton).toBeInTheDocument()
})

test("Close calls the hide function", () => {
  render(<NameChangeModal show={true} hide={hide} changeName={changeName}/>);
  screen.getByText(/Close/i).click();
  expect(hide).toBeCalled();
})

test("Close is on screen and clickable", () => {
  render(<NameChangeModal show={true} hide={hide} changeName={changeName}/>);
  const submitButton = screen.getByText(/Submit/i)
  submitButton.click();
  expect(submitButton).toBeInTheDocument()
})

test("Submit calls the changeName function", () => {
  render(<NameChangeModal show={true} hide={hide} changeName={changeName}/>);
  screen.getByText(/Submit/i).click();
  expect(changeName).toBeCalled();
})