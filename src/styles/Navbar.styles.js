import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Nav = styled.nav`
  background-color: #1e293b;
  padding: 1rem 0;
  width: 100%;
  border-bottom: 1px solid #334155;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; // Responsivo para móviles
`;

export const Logo = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    opacity: 0.9;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }
`;

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #94a3b8;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    color: #3b82f6;
    background-color: rgba(59, 130, 246, 0.1);
  }

  // Clase automática de React Router para la ruta actual
  &.active {
    color: #ffffff;
    background-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
`;