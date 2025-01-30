import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.card};
  padding: 4rem 2rem 2rem;
  color: ${({ theme }) => theme.text};
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FooterTitle = styled.h3`
  color: ${({ theme }) => theme.primary};
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 1rem;
  line-height: 1.6;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const FooterText = styled.p`
  line-height: 1.6;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1rem;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SocialIcon = styled.a`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
  }
`;

export const BottomBar = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  text-align: center;
  font-size: 0.9rem;
`;
