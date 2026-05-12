import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCountries, toggleFavorite } from '../store/slices/countrySlices'; // Importamos toggleFavorite
import { RootState, AppDispatch } from '../store';
import * as S from '../styles/Home.styles';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // Traemos searchTerm y favorites desde el estado global de Redux
  const { list, status, error, searchTerm, favorites } = useSelector((state: RootState) => state.countries);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCountries());
    }
  }, [status, dispatch]);

  const filteredCountries = list.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === 'loading') return <S.LoadingText>Cargando Enciclopedia...</S.LoadingText>;
  if (status === 'failed') return <p style={{textAlign: 'center', color: 'red'}}>Error: {error}</p>;

  return (
    <S.HomeWrapper>
      {/* El SearchBox se puede quedar aquí o quitarse si ya lo pusiste en el Navbar */}
      
      <S.Grid>
        {filteredCountries.map((country) => {
          // Verificamos si este país ya está en favoritos
          const isFav = favorites.some(fav => fav.cca3 === country.cca3);

          return (
            <S.Card key={country.cca3}>
              <img src={country.flag} alt={`Bandera de ${country.name}`} />
              <S.CardInfo>
                <h3>{country.name}</h3>
                <p>📍 {country.region}</p>
                <p>👥 {country.population.toLocaleString()}</p>
                
                {/* Contenedor de botones */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                  <button 
                    onClick={() => navigate(`/country/${country.cca3}`)}
                    style={{ 
                      flex: 2, 
                      padding: '8px', 
                      cursor: 'pointer', 
                      backgroundColor: '#3b82f6', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px' 
                    }}
                  >
                    Ver más
                  </button>
                  
                  <button 
                    onClick={() => dispatch(toggleFavorite(country))}
                    style={{ 
                      flex: 1, 
                      padding: '8px', 
                      cursor: 'pointer', 
                      backgroundColor: isFav ? '#ef4444' : '#334155', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px',
                      fontSize: '1.2rem'
                    }}
                  >
                    {isFav ? '🤍' : '❤️'}
                  </button>
                </div>
              </S.CardInfo>
            </S.Card>
          );
        })}
      </S.Grid>
      
      {filteredCountries.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>No se encontraron países.</p>
      )}
    </S.HomeWrapper>
  );
};

export default Home;