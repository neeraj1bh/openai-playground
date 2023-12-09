import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Button component', () => {
  it('renders children correctly', () => {
    render(<Home />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
