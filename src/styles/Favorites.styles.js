import styled from 'styled-components';

export const FavoritesWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #f1f5f9;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 4rem;
  background-color: #1e293b;
  border-radius: 12px;
  border: 1px dashed #475569;
  
  p { color: #94a3b8; font-size: 1.2rem; }
`;

export const Grid = styled.div`
  display: grid;
  gap: 20px;
  // Responsivo: 1 col móvil, 2 tablet, 4 desktop
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

export const FavCard = styled.div`
  background: #1e293b;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #334155;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 140px;
    object-fit: cover;
  }
`;

export const CardContent = styled.div`
  padding: 1rem;
  h3 { margin: 0; font-size: 1.1rem; }
  p { color: #94a3b8; font-size: 0.9rem; margin: 0.5rem 0; }
`;