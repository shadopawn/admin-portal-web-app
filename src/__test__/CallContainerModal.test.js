import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import CallContainerModal from '../components/CallContainerModal';

//This page doesn't have anything in it yet but is there simply for routing
test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CallContainerModal />, div);
})

test('renders welcome message', () => {
  render(<CallContainerModal />);
  const linkElement = screen.getByText(/What call would you like to add?/i);
  expect(linkElement).toBeInTheDocument();
});