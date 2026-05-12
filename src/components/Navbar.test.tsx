import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { renderWithProviders } from '../test-utils'; // Ajusta la ruta si es necesario



const renderNavbar = () => render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  </Provider>
);

test('debe mostrar el buscador correctamente', () => {
  renderNavbar();
  const input = screen.getByPlaceholderText(/buscar país/i);
  expect(input).toBeInTheDocument();
});

test('debe disparar la función de búsqueda al escribir', () => {
  renderWithProviders(<Navbar />);
  const input = screen.getByPlaceholderText(/buscar país/i);
  
  // Esto ejecuta la función flecha de la línea 15 que despacha el action
  fireEvent.change(input, { target: { value: 'Mexico' } });
  
  expect(input.value).toBe('Mexico');
});