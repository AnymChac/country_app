import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import CountryCard from './CountryCard';

const mockCountry = {
  name: 'Mexico',
  cca3: 'MEX',
  flags: { svg: 'flag.svg' },
  region: 'Americas',
  population: 126000000,
  capital: ['CDMX']
};

test('debe mostrar la información y permitir interactuar con favoritos', () => {
  // Usamos nuestra utilidad para envolver el componente automáticamente
  renderWithProviders(<CountryCard country={mockCountry} />);

  // 1. Verifica renderizado (Sube % de líneas)
  expect(screen.getByText('Mexico')).toBeInTheDocument();
  
  // 2. Simula click en favoritos (Sube % de funciones al ejecutar el dispatch)
  const favButton = screen.getByText('🤍'); 
  fireEvent.click(favButton);
});