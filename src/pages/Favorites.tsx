import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { Country, toggleFavorite } from '../store/slices/countrySlices';
import * as S from '../styles/Favorites.styles';

const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtenemos favoritos y el término de búsqueda del estado global
  const { favorites, searchTerm } = useSelector((state: RootState) => state.countries);

  // FILTRADO: Esta es la clave para que la búsqueda funcione en esta página
  const filteredFavorites = favorites.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <S.FavoritesWrapper>
      <S.Title>Mis Países Favoritos ❤️</S.Title>

      {/* CASO 1: No hay ningún favorito guardado en la lista global */}
      {favorites.length === 0 ? (
        <S.EmptyMessage>
          <p>Aún no has guardado países en tu lista.</p>
          <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
            ← Volver a la enciclopedia
          </Link>
        </S.EmptyMessage>
      ) : 
      /* CASO 2: Hay favoritos, pero la búsqueda actual no coincide con ninguno */
      filteredFavorites.length === 0 ? (
        <S.EmptyMessage>
          <p>No se encontraron favoritos que coincidan con "{searchTerm}"</p>
        </S.EmptyMessage>
      ) : (
        /* CASO 3: Renderizado de la lista filtrada */
        <S.Grid>
          {filteredFavorites.map((country: Country) => (
            <S.FavCard key={country.cca3}>
              {/* Imagen clickeable */}
              <img 
                src={country.flag} 
                alt={country.name} 
                onClick={() => navigate(`/country/${country.cca3}`)}
                style={{ cursor: 'pointer' }}
              />
              
              <S.CardContent>
                <h3>{country.name}</h3>
                <p>📍 {country.region}</p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginTop: '1rem' 
                }}>
                  <Link 
                    to={`/country/${country.cca3}`} 
                    style={{ fontSize: '0.9rem', color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}
                  >
                    Ver detalles →
                  </Link>

                  {/* Botón de favorito con el corazón BLANCO (porque ya es favorito) */}
                  <button 
                    onClick={() => dispatch(toggleFavorite(country))}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer', 
                      fontSize: '1.2rem',
                      padding: '5px' 
                    }}
                    title="Quitar de favoritos"
                  >
                    ❌
                  </button>
                </div>
              </S.CardContent>
            </S.FavCard>
          ))}
        </S.Grid>
      )}
    </S.FavoritesWrapper>
  );
};

export default Favorites;