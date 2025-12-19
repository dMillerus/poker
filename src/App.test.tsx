import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';

describe('App', () => {
  it('should render the header', () => {
    render(<App />);
    expect(screen.getByText('Poker Trainer')).toBeInTheDocument();
  });

  it('should render welcome message', () => {
    render(<App />);
    expect(screen.getByText('Welcome to Poker Trainer')).toBeInTheDocument();
  });

  it('should render navigation buttons', () => {
    render(<App />);
    expect(screen.getByText('Start Training')).toBeInTheDocument();
    expect(screen.getByText('View Statistics')).toBeInTheDocument();
  });
});
