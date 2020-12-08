import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Analytics from '../components/Analytics';

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Analytics />, div);
})