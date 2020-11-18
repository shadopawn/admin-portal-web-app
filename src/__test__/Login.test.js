import { render, screen } from '@testing-library/react';
import Login from '../components/Login';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/home"
    })
  }));

test('renders learn react link', () => {
    const location = {
        pathname: '/home',
        state: { fromDashboard: true }
      }
  render(<Login to={location} />);
  const linkElement = screen.getByRole('button');
  expect(linkElement).toHaveTextContent('Log in');
});
