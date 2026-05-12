import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Country {
  name: string;
  cca3: string;
  flag: string;     
  region: string;
  population: number;
  capital: string;   
}

interface CountryState {
  list: Country[];
  favorites: Country[];
  searchTerm: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CountryState = {
  list: [],
  favorites: [],
  searchTerm: '',
  status: 'idle',
  error: null,
};

// Acción asíncrona optimizada
export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries', 
  async (_, { rejectWithValue }) => {
    try {
      // QA: Filtramos solo los campos necesarios para mejorar el performance y evitar el Error 400
      const response = await axios.get(
        'https://restcountries.com/v3.1/all?fields=name,cca3,flags,capital,region,population'
      );

      return response.data.map((c: any) => ({
        name: c.name.common,
        cca3: c.cca3,
        flag: c.flags.svg,
        // Algunos países no tienen capital, manejamos el caso de borde (Edge Case)
        capital: c.capital && c.capital.length > 0 ? c.capital[0] : 'N/A',
        region: c.region,
        population: c.population,
      }));
    } catch (error: any) {
      // Capturamos el error detallado para el estado de Redux
      return rejectWithValue(error.response?.data || 'Error al conectar con la API');
    }
  }
);

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Country>) => {
      const index = state.favorites.findIndex((c: Country) => c.cca3 === action.payload.cca3);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error.message || 'Error desconocido';
      });
  },
});

export const { toggleFavorite, setSearchTerm } = countrySlice.actions;
export default countrySlice.reducer;