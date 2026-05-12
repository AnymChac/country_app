// Importamos el reducer y la acción asíncrona
import reducer, { fetchCountries } from './countrySlices'; 

describe('countrySlice extraReducers', () => {
  test('debe manejar el estado de error (rejected) en fetchCountries', () => {
    const action = { 
      type: fetchCountries.rejected.type, 
      // Importante: asegúrate de que el payload o error coincida con tu lógica
      error: { message: 'Error de conexión' } 
    };
    
    const state = reducer(undefined, action);
    
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Error de conexión');
  });
  test('debe manejar el estado pending y fulfilled de fetchCountries', () => {
    // Caso Pending (Cubre línea 39-41 aprox)
    const statePending = reducer(undefined, { type: fetchCountries.pending.type });
    expect(statePending.status).toBe('loading');

    // Caso Fulfilled (Cubre líneas 42-50 aprox)
    const mockPayload = [{ name: 'Mexico', cca3: 'MEX' }];
    const stateFulfilled = reducer(undefined, { 
      type: fetchCountries.fulfilled.type, 
      payload: mockPayload 
    });
    expect(stateFulfilled.status).toBe('succeeded');
    expect(stateFulfilled.list).toEqual(mockPayload);
  });
  test('debe cubrir las funciones de extraReducers (pending y fulfilled)', () => {
  // 1. Prueba el estado Loading (Línea 39)
  const statePending = reducer(undefined, { type: fetchCountries.pending.type });
  expect(statePending.status).toBe('loading');

  // 2. Prueba el estado Success (Líneas 42-50)
  const mockPayload = [{ name: 'Mexico', cca3: 'MEX', flags: { svg: '' }, region: 'Americas', population: 0, capital: [] }];
  const stateFulfilled = reducer(undefined, { 
    type: fetchCountries.fulfilled.type, 
    payload: mockPayload 
  });
  expect(stateFulfilled.status).toBe('succeeded');
  expect(stateFulfilled.list).toHaveLength(1);

  // 3. Prueba la función de setSearchTerm (Línea 62)
  const stateSearch = reducer(undefined, { type: 'countries/setSearchTerm', payload: 'test' });
  expect(stateSearch.searchTerm).toBe('test');
});

test('debe cubrir funciones de carga y éxito', () => {
  // Cubre la función de 'pending' (Líneas 39-41 aprox)
  const statePending = reducer(undefined, { type: fetchCountries.pending.type });
  expect(statePending.status).toBe('loading');

  // Cubre la función de 'fulfilled' (Líneas 42-50 aprox)
  const mockData = [{ name: 'Test', cca3: 'TST' }];
  const stateFulfilled = reducer(undefined, { 
    type: fetchCountries.fulfilled.type, 
    payload: mockData 
  });
  expect(stateFulfilled.list).toEqual(mockData);

  // Cubre la función setSearchTerm (Línea 62)
  const stateSearch = reducer(undefined, { 
    type: 'countries/setSearchTerm', 
    payload: 'mex' 
  });
  expect(stateSearch.searchTerm).toBe('mex');
});
test('debe cubrir reducers pendientes', () => {
  // Cubre la función flecha de 'pending' (Líneas 39-41)
  const statePending = reducer(undefined, { type: fetchCountries.pending.type });
  expect(statePending.status).toBe('loading');

  // Cubre la función flecha de 'fulfilled' (Líneas 42-50)
  const mockData = [{ name: 'Mexico', cca3: 'MEX' }];
  const stateFulfilled = reducer(undefined, { 
    type: fetchCountries.fulfilled.type, 
    payload: mockData 
  });
  expect(stateFulfilled.status).toBe('succeeded');

  // Cubre setSearchTerm (Línea 62)
  const stateSearch = reducer(undefined, { type: 'countries/setSearchTerm', payload: 'mex' });
  expect(stateSearch.searchTerm).toBe('mex');
});
});