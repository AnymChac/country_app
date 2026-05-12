import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleFavorite } from '../store/slices/countrySlices';
import { ActionButton, DetailWrapper, Flag, InfoGroup } from '../styles/CountryDetails.styles';

const CountryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Buscamos el país en la lista del store
  const country = useSelector((state: RootState) => 
    state.countries.list.find(c => c.cca3 === id)
  );

  // Verificamos si ya es favorito
  const isFavorite = useSelector((state: RootState) => 
    state.countries.favorites.some(f => f.cca3 === id)
  );

  if (!country) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>País no encontrado</h2>
        <button onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    );
  }

  return (
    <DetailWrapper>
      <Flag src={country.flag} alt={country.name} />
      
      <InfoGroup>
        <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>← Volver</button>
        <h1>{country.name}</h1>
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Región:</strong> {country.region}</p>
        <p><strong>Población:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Código ISO:</strong> {country.cca3}</p>

        <ActionButton
          $isFavorite={isFavorite}
          onClick={() => dispatch(toggleFavorite(country))}
        >
          {isFavorite ? 'Quitar de Favoritos 🤍' : 'Agregar a Favoritos ❤️'}
        </ActionButton>
      </InfoGroup>
    </DetailWrapper>
  );
};

export default CountryDetails;