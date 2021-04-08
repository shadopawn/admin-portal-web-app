import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import CallCard from '../components/CallCard';
//Component is just a button

const mockHandleClick = jest.fn();
const host = "http://localhost/"

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CallCard />, div);
})

test("renders button with props passed in", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CallCard name="testName" handleClick={()=>{}}/>, div);
})

test("renders name prop", () => {
  render(<CallCard name="testName"/>);
  const videoCard = screen.getByText(/testName/i)
  expect(videoCard).toBeInTheDocument();
})

test("Call button is on screen and clickable", () => {
  render(<CallCard handleClick={mockHandleClick}/>);
  const videoButton = screen.getByTestId("btnCall");
  videoButton.click();
  expect(videoButton).toBeInTheDocument();
})

test("HandleClick to be called", () => {
  render(<CallCard handleClick={mockHandleClick}/>);
  screen.getByTestId("btnCall").click()
  expect(mockHandleClick).toBeCalled()
})

test("correct imageURL being used", () => {
  render(<CallCard handleClick={mockHandleClick} imageURL="call.png"/>);
  const callImage = screen.getByAltText("call")
  expect(callImage.src).toBe(host + "call.png")
})