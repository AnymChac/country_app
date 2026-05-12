import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import CountryCard from './CountryCard';

// Definimos el mock con la estructura exacta que pide tu interfaz 'Country'
const mockCountry = {
  name: 'Mexico',
  cca3: 'MEX',
  flag: 'flag.svg',    // Singular y string
  region: 'Americas',
  population: 126000000,
  capital: 'CDMX'      // CAMBIO: String directo, no arreglo
};

test('debe mostrar la información y permitir interactuar con favoritos', () => {
  // Al pasar mockCountry, TS ya no detectará propiedades faltantes o tipos erróneos
  renderWithProviders(<CountryCard country={mockCountry} />);

  // 1. Verifica renderizado
  expect(screen.getByText('Mexico')).toBeInTheDocument();
  
  // 2. Simula click en favoritos
  // Nota: Asegúrate de que el botón tenga ese emoji o usa getByRole('button')
  const favButton = screen.getByText(/🤍|❤️/); 
  fireEvent.click(favButton);
});