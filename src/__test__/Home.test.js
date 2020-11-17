import { render, screen } from '@testing-library/react';
import Home from '../components/Home';
import { BrowserRouter } from 'react-router-dom';

test('renders welcome message', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>);
  const linkElement = screen.getByText(/Welcome to the Admin Portal/i);
  expect(linkElement).toBeInTheDocument();
});