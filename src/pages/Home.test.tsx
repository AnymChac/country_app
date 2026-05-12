import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import Home from './Home';

// Definimos el mock con name como STRING para que coincida con tu lógica de filtro
const mockData = [{ 
  name: 'Mexico', 
  cca3: 'MEX', 
  flag: 'flag.png', 
  region: 'Americas', 
  population: 126000000, 
  capital: 'CDMX' 
}];

test('debe ejecutar las funciones de mapeo de lista', () => {
  renderWithProviders(<Home />, {
    preloadedState: {
      countries: {
        list: mockData,
        favorites: mockData, // Inyecta datos aquí también
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
