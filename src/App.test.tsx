import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store'; 
import App from './App';

test('debe renderizar el componente App sin romperse', () => {
  render(
    <Provider store={store}>
      {/* Eliminamos el BrowserRouter de aquí porque App ya tiene uno dentro o en el index */}
      <App />
    </Provider>
  );
  
  // Verifica que el nombre de tu app aparezca en pantalla
  const titleElement = screen.getByText(/CountryPedia/i); 
  expect(titleElement).toBeInTheDocument();
});