import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import VideoCard from '../components/VideoCard';
//Component is just a button

const mockHandleClick = jest.fn();

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<VideoCard />, div);
})

test("render button with props passed in", () => {
  const div = document.createElement("div");
  ReactDOM.render(<VideoCard name="testName" handleClick={()=>{}}/>, div);
})

test("renders name prop", () => {
  render(<VideoCard name="testName"/>);
  const videoCard = screen.getByText(/testName/i)
  expect(videoCard).toBeInTheDocument();
})

test("Can click Video Button without crashing", () => {
  render(<VideoCard handleClick={mockHandleClick}/>);
  screen.getByTestId("btnVideo").click()
})

test("HandleClick to be called", () => {
  render(<VideoCard handleClick={mockHandleClick}/>);
  screen.getByTestId("btnVideo").click()
  expect(mockHandleClick).toBeCalled()
})