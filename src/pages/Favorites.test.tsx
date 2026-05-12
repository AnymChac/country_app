import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import Favorites from './Favorites';

const mockFavorites = {
  name: 'Mexico',
  cca3: 'MEX',
  flag: 'https://flagcdn.com/mx.svg', // Propiedad correcta: flag (string)
  region: 'Americas',
  population: 126000000,
  capital: 'CDMX' // Si tu interfaz dice que es string y no array, quita los corchetes
};

test('debe renderizar favoritos y permitir eliminar uno', () => {
  renderWithProviders(<Favorites />, {
    preloadedState: {
      countries: {
        list: [],
        favorites: [mockFavorites],
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