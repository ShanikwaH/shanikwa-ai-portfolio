import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio header', () => {
  render(<App />);
  expect(screen.getByText(/AI-Powered Portfolio/i)).toBeInTheDocument();
});

test('renders the default Overview tab', () => {
  render(<App />);
  expect(screen.getAllByText(/Overview/i).length).toBeGreaterThan(0);
});
