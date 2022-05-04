import { render, screen } from '@testing-library/react';
import SignedInApp from './SignedInApp';

test('renders learn react link', () => {
  render(<SignedInApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
