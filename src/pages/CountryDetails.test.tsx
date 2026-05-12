import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import CountryDetails from './CountryDetails';

// Mock de useParams para inyectar el ID sin usar un Router extra
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'MEX' }),
  useNavigate: () => jest.fn(),
}));

const mockCountry = {
  name: 'Mexico',
  cca3: 'MEX',
  flag: 'https://flagcdn.com/mx.svg', // CAMBIADO: 'flag' en lugar de 'flags'
  region: 'Americas',
  population: 126000000,
  capital: 'CDMX' // CAMBIADO: 'CDMX' en lugar de ['CDMX']
};

test('debe cubrir las funciones de detalles, favoritos y navegación', () => {
  renderWithProviders(<CountryDetails />, {
    preloadedState: {
      countries: {
        list: [mockCountry],
        favorites: [],
        status: 'succeeded',
        searchTerm: '',
        error: null
      }
    }
  });

  // 1. Cubre la función de búsqueda (find) y renderizado (Líneas 14-20)
  expect(screen.getByText('Mexico')).toBeInTheDocument();

  // 2. Cubre la función dispatch(toggleFavorite) (Línea 51)
  const favButton = screen.getByRole('button', { name: /Agregar a Favoritos/i });
  fireEvent.click(favButton);

  // 3. Cubre la función de navegación (Línea 42)
  const backButton = screen.getByText(/← Volver/i);
  fireEvent.click(backButton);
});