import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export const HeaderSection = styled.section`
  background: ${({ theme }) => theme.cardBackground};
  padding: 6rem 2rem;
  text-align: center;
`;

export const HeaderContent = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.textColor};
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.textMuted};
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

export const DetailedSection = styled.section`
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.cardBackground};
  
  &[data-alternate="true"] {
    background: ${({ theme }) => theme.background};
  }
`;

export const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

export const ServiceCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ServiceIcon = styled.div`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const ServiceTitle = styled.h3`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.textMuted};
  line-height: 1.6;
`;

export const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

export const ServiceFeature = styled.li`
  color: ${({ theme }) => theme.textColor};
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: "•";
    color: ${({ theme }) => theme.primaryColor};
  }
`; 