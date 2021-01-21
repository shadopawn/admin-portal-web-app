import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import CallCard from '../components/CallCard';

//This page doesn't have anything in it yet but is there simply for routing
test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CallCard />, div);
})

test('renders welcome message', () => {
  render(<CallCard name={'Test Name'}/>);
  const linkElement = screen.getByText(/Test Name/i);
  expect(linkElement).toBeInTheDocument();
});