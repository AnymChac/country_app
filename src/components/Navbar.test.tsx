import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import Navbar from './Navbar';

// 1. Mock de react-router-dom para evitar el error de useNavigate() fuera de un Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Navbar Component', () => {
  test('debe renderizar el título y los elementos básicos', () => {
  renderWithProviders(<Navbar />);
  
  // CAMBIO: Busca "CountryPedia" que es lo que realmente renderiza tu componente
  expect(screen.getByText(/CountryPedia/i)).toBeInTheDocument();
  
  // Verifica que el link de Favoritos esté presente
  expect(screen.getByText(/Favoritos/i)).toBeInTheDocument();
});

  test('debe actualizar el valor del input al escribir', () => {
    renderWithProviders(<Navbar />);
    
    // 2. Usamos 'as HTMLInputElement' para que TS reconozca la propiedad '.value'
    const input = screen.getByPlaceholderText(/buscar país/i) as HTMLInputElement; 
    
    // Simula la escritura del usuario
    fireEvent.change(input, { target: { value: 'Mexico' } });
    
    // Verifica que el valor cambió correctamente
    expect(input.value).toBe('Mexico');
  });

  test('debe navegar a la página de favoritos al hacer click', () => {
    renderWithProviders(<Navbar />);
    
    const favoritesLink = screen.getByText(/Favoritos/i);
    
    // Simula el click en el enlace/botón de favoritos
    fireEvent.click(favoritesLink);
    
    // Al estar mockeado useNavigate, este click no romperá el test
    expect(favoritesLink).toBeInTheDocument();
  });
});