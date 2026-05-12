import { configureStore, combineReducers } from '@reduxjs/toolkit';
import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; // IMPORTANTE
import countryReducer from './store/slices/countrySlices'; 

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: any;
  store?: any;
}

const rootReducer = combineReducers({
  countries: countryReducer,
});

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({ 
      reducer: rootReducer, 
      preloadedState 
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): React.ReactElement {
    // Envolvemos con el Router para solucionar el error de 'future' de useContext
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}