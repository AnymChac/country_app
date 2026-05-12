import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchTerm } from '../store/slices/countrySlices';
import { RootState } from '../store';
import * as S from '../styles/Navbar.styles';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchTerm = useSelector((state: RootState) => state.countries.searchTerm);
  const favoritesCount = useSelector((state: RootState) => state.countries.favorites.length);

  const handleGoHome = (e: React.MouseEvent) => {
    e.preventDefault();          // Evitamos el comportamiento por defecto del enlace
    dispatch(setSearchTerm('')); // 1. Limpiamos el buscador
    navigate('/');               // 2. Redirigimos manualmente
  };

  return (
    <S.Nav>
      <S.NavContainer>
        {/* Usamos as="a" o simplemente un div si el estilo lo permite para manejar el click */}
        <S.Logo 
          as="a" 
          to="/" // Esto satisface a TypeScript
          onClick={handleGoHome} 
          style={{ cursor: 'pointer' }}
        >
          CountryPedia 🌍
        </S.Logo>
        
        <input 
          type="text" 
          placeholder="Buscar país..." 
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          style={{ padding: '8px', borderRadius: '5px', border: 'none' }}
        />

        <S.NavLinks>
          <S.StyledLink 
            as="a" 
            to="/" // Añadimos esto para calmar a TypeScript
            onClick={handleGoHome} 
            style={{ cursor: 'pointer' }}
          >
            Inicio
          </S.StyledLink>
          <S.StyledLink to="/favorites">
            Favoritos{favoritesCount > 0 && ` (${favoritesCount})`}
          </S.StyledLink>
        </S.NavLinks>
      </S.NavContainer>
    </S.Nav>
  );
};

export default Navbar;