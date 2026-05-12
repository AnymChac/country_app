import styled from 'styled-components';

export const HomeWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;

  input {
    width: 100%;
    max-width: 600px;
    padding: 1rem 1.5rem;
    border-radius: 50px;
    border: 2px solid #334155;
    background: #1e293b;
    color: white;
    font-size: 1.1rem;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
    }
  }
`;

export const Grid = styled.main`
  display: grid;
  gap: 2rem;
  // Responsividad: Automático según el ancho
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
`;

export const Card = styled.div`
  background: #1e293b;
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid #334155;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    border-color: #3b82f6;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }
`;

export const CardInfo = styled.div`
  padding: 1.5rem;
  h3 { margin: 0 0 0.5rem; font-size: 1.2rem; color: #fff; }
  p { margin: 0; color: #94a3b8; font-size: 0.9rem; }
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #3b82f6;
  margin-top: 5rem;
`;

export const CountryCard = styled.div`
  background-color: #1e293b;
  border-radius: 12px;
  overflow: hidden;
  /* ... tus otros estilos ... */
`;