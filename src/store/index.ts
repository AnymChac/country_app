import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './slices/countrySlices';

export const store = configureStore({
  reducer: {
    countries: countryReducer,
  },
});

// Tipos para usar en los hooks de los componentes
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;