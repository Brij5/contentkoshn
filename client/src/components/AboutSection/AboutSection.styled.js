import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Section = styled.section`
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.background};
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const Content = styled.div`
  @media (max-width: 968px) {
    order: 2;
  }
`;

export const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
  line-height: 1.2;
  font-weight: 700;

  span {
    color: ${({ theme }) => theme.primary};
  }
`;

export const Description = styled(motion.p)`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

export const Stats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 968px) {
    justify-items: center;
  }
`;

export const StatItem = styled(motion.div)`
  text-align: center;
`;

export const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${({ theme }) => theme.primary}15;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
`;

export const StatNumber = styled.h3`
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

export const StatLabel = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1rem;
`;

export const ImageWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 968px) {
    order: 1;
  }
`;

export const Image = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
`;
