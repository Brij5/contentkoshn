import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SectionContainer = styled.section`
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

export const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

export const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  font-weight: 700;

  span {
    color: ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

export const PricingGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PricingCard = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;

  &[data-popular="true"] {
    border: 2px solid ${({ theme }) => theme.primary};
    transform: scale(1.05);

    &::before {
      content: 'Most Popular';
      position: absolute;
      top: 1rem;
      right: -2rem;
      background: ${({ theme }) => theme.primary};
      color: white;
      padding: 0.5rem 3rem;
      transform: rotate(45deg);
      font-size: 0.8rem;
      font-weight: 500;
    }
  }

  &:hover {
    transform: scale(1.05);

    &[data-popular="true"] {
      transform: scale(1.08);
    }
  }
`;

export const PlanName = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const Price = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  margin-bottom: 2rem;

  span {
    font-size: 1rem;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

export const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
`;

export const Feature = styled.li`
  color: ${({ theme }) => theme.text};
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    color: ${({ theme }) => theme.primary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const PricingButton = styled(motion.button)`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: 2px solid ${({ theme }) => theme.primary};
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &[data-primary="false"] {
    background: transparent;
    color: ${({ theme }) => theme.primary};

    &:hover {
      background: ${({ theme }) => theme.primary}10;
    }
  }

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`; 