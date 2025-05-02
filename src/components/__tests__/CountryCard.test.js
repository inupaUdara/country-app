// src/components/__tests__/CountryCard.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryCard from '../CountryCard';

const mockCountry = {
  name: { common: 'Test Country' },
  cca3: 'TST',
  flags: { png: 'https://flagcdn.com/w320/tc.png' },
  population: 1000000,
  region: 'Test Region',
  capital: ['Test Capital'],
};

describe('CountryCard', () => {
  it('renders country information correctly', () => {
    render(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText(/Population:/)).toHaveTextContent('1,000,000');
    expect(screen.getByText(/Region:/)).toHaveTextContent('Test Region');
    expect(screen.getByText(/Capital:/)).toHaveTextContent('Test Capital');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Flag of Test Country');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/country/TST');
  });
});