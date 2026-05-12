import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import Home from './Home';

// Definimos el mock con name como STRING para que coincida con tu lógica de filtro
const mockData = {
  name: 'Mexico',
  cca3: 'MEX',
  flag: 'https://flagcdn.com/mx.svg', // Propiedad correcta: flag (string)
  region: 'Americas',
  population: 126000000,
  capital: 'CDMX' // Si tu interfaz dice que es string y no array, quita los corchetes
};

test('debe ejecutar las funciones de mapeo de lista', () => {
  renderWithProviders(<Home />, {
    preloadedState: {
      countries: {
        list: [mockData],
        favorites: [mockData], // Inyecta datos aquí también
        status: 'succeeded',
        searchTerm: '',
        error: null
      }
    }
  });

  // Esto obliga a ejecutar la función anónima dentro de .map()
  expect(screen.getByText('Mexico')).toBeInTheDocument();
  
  // DISPARA OTRA FUNCIÓN: Haz click en el corazón
  const favButton = screen.getByText('🤍'); 
  fireEvent.click(favButton);
});
