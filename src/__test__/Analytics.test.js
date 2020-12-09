import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Analytics from '../components/Analytics';

//This page doesn't have anything in it yet but is there simply for routing
test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Analytics />, div);
})

test('renders welcome message', () => {
  render(<Analytics />);
  const linkElement = screen.getByText(/You found the Analytics page!/i);
  expect(linkElement).toBeInTheDocument();
});