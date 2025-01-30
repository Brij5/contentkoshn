import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Section = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
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

const Content = styled.div`
  @media (max-width: 968px) {
    order: 2;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  color: #333;
  line-height: 1.2;
  margin-bottom: 1.5rem;

  span {
    color: #2196F3;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.25rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(Link)`
  padding: 1rem 2rem;
  background: #2196F3;
  color: white;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #1976D2;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(Link)`
  padding: 1rem 2rem;
  background: transparent;
  color: #2196F3;
  border: 2px solid #2196F3;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #2196F310;
    transform: translateY(-2px);
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;

  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
  }

  @media (max-width: 968px) {
    order: 1;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const HeroSection = () => {
  return (
    <Section>
      <Container>
        <Content>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Title>
              Streamline Your <span>Content</span> Management
            </Title>
            <Description>
              Create, manage, and deliver content effortlessly with our powerful platform.
              Built for modern teams and businesses.
            </Description>
            <ButtonGroup>
              <PrimaryButton to="/register">
                Get Started <FiArrowRight />
              </PrimaryButton>
              <SecondaryButton to="/demo">
                View Demo
              </SecondaryButton>
            </ButtonGroup>
          </motion.div>
        </Content>

        <ImageContainer
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src="/images/hero-illustration.svg" 
            alt="ContentKosh Platform" 
            loading="eager"
          />
        </ImageContainer>
      </Container>
    </Section>
  );
};

export default HeroSection;
