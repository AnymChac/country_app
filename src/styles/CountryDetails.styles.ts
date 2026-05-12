import styled from 'styled-components';

interface ActionButtonProps {
  $isFavorite: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}
export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Flag = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

export const InfoGroup = styled.div`
  flex: 1;
  h1 { font-size: 2.5rem; margin-bottom: 1rem; }
  p { font-size: 1.1rem; color: #94a3b8; margin: 0.5rem 0; }
  strong { color: #f1f5f9; }
`;

export const ActionButton = styled.button<ActionButtonProps>`
  background-color: ${props => (props.$isFavorite ? '#ef4444' : '#3b82f6')};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
`as React.FC<ActionButtonProps>;