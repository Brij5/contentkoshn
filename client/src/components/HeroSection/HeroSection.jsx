import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Section = styled.section`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
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
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const Button = styled(Link)`
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;

  &.primary {
    background-color: #2196F3;
    color: white;
    border: none;

    &:hover {
      background-color: #1976D2;
    }
  }

  &.secondary {
    background-color: transparent;
    color: #2196F3;
    border: 2px solid #2196F3;

    &:hover {
      background-color: #2196F3;
      color: white;
    }
  }
`;

const ImageWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 968px) {
    order: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
`;

const HeroSection = () => {
  return (
    <Section>
      <Container>
        <Content>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Manage Your Content with Ease
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A powerful content management system that helps you create, organize,
            and publish content efficiently across multiple platforms.
          </Description>
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button to="/auth/register" className="primary">
              Get Started
            </Button>
            <Button to="/about" className="secondary">
              Learn More
            </Button>
          </ButtonGroup>
        </Content>
        <ImageWrapper
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image src="/images/hero-illustration.svg" alt="Content Management" />
        </ImageWrapper>
      </Container>
    </Section>
  );
};

export default HeroSection;
