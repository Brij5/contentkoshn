import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Section = styled.section`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  padding: 2rem;
  background: ${({ theme }) => theme.background};
  overflow: hidden;
  position: relative;
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
  position: relative;
  z-index: 1;

  @media (max-width: 968px) {
    order: 2;
  }
`;

export const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  span {
    color: ${({ theme }) => theme.primary};
  }
`;

export const Description = styled(motion.p)`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;

  @media (max-width: 968px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

export const StyledButton = styled(Link)`
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &[data-variant="primary"] {
    background: ${({ theme }) => theme.primary};
    color: white;
    border: none;

    &:hover {
      background: ${({ theme }) => theme.primaryDark};
      transform: translateY(-2px);
    }
  }

  &[data-variant="secondary"] {
    background: transparent;
    color: ${({ theme }) => theme.primary};
    border: 2px solid ${({ theme }) => theme.primary};

    &:hover {
      background: ${({ theme }) => theme.primary}10;
      transform: translateY(-2px);
    }
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

export const ImageWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 968px) {
    order: 1;
  }
`;

export const Image = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15));
`;

export const Shapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
`;

export const Shape = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;
  opacity: 0.1;

  &[data-shape="1"] {
    width: 300px;
    height: 300px;
    top: -150px;
    right: -150px;
  }

  &[data-shape="2"] {
    width: 200px;
    height: 200px;
    bottom: -100px;
    left: -100px;
  }
`;
