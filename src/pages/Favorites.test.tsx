import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import Favorites from './Favorites';

const mockFavorites = [
  { 
    name: 'Mexico', 
    cca3: 'MEX', 
    flag: 'mex-flag.svg', 
    region: 'Americas', 
    population: 126000000, 
    capital: 'CDMX' 
  }
];

test('debe renderizar favoritos y permitir eliminar uno', () => {
  renderWithProviders(<Favorites />, {
    preloadedState: {
      countries: {
        list: [],
        favorites: mockFavorites,
        status: 'succeeded',
        searchTerm: '',
        error: null
      }
    }
  });

  expect(screen.getByText('Mexico')).toBeInTheDocument();

  const removeButton = screen.getByText(/❤️|🤍/); 
  fireEvent.click(removeButton);
});