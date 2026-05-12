import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
// No importamos ni usamos MemoryRouter aquí si App ya lo tiene dentro
import { store } from './store'; 
import App from './App';

test('debe renderizar el componente App sin romperse', () => {
  render(
    <Provider store={store}>
      {/* Si App.tsx ya tiene el <BrowserRouter basename="/country_app">,
         no pongas nada más aquí.
      */}
      <App />
    </Provider>
  );
});