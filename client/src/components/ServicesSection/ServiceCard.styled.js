import styled from 'styled-components';

export const StyledServiceCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackgroundColor};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
  }
`;

export const StyledServiceCategory = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;
`;

export const StyledServiceItem = styled.div`
  padding: 0.75rem 0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme.textColor === 'white' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

export const StyledServiceItemIcon = styled.span`
  font-size: 1.25rem;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.primaryColor};
`;

export const StyledServiceItemTitle = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 0.25rem;
`;

export const StyledServiceItemDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => (theme.textColor === 'white' ? '#9ca3af' : '#6b7280')};
`;
