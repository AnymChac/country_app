import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, Country } from '../store/slices/countrySlices';
import { RootState } from '../store';
import * as S from '../styles/Home.styles'; // Usa tus estilos de Grid

interface Props {
  country: Country;
}

const CountryCard: React.FC<Props> = ({ country }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) => 
    state.countries.favorites.some(f => f.cca3 === country.cca3)
  );

  return (
    <S.CountryCard>
      <img src={country.flag} alt={country.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
      <div style={{ padding: '15px' }}>
        <h3>{country.name}</h3>
        <p>🌍 Región: {country.region}</p>
        <p>👥 Población: {country.population.toLocaleString()}</p>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <button 
            onClick={() => navigate(`/country/${country.cca3}`)}
            style={{ flex: 1, padding: '8px', cursor: 'pointer' }}
          >
            Ver más
          </button>
          <button 
            onClick={() => dispatch(toggleFavorite(country))}
            style={{ 
              padding: '8px', 
              background: isFavorite ? '#ef4444' : '#334155',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </S.CountryCard>
  );
};

export default CountryCard;