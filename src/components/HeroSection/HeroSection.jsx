import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.backgroundPrimary}, ${theme.backgroundSecondary})`};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    min-height: 80vh;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;

  @media (max-width: 968px) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
`;

const TextContent = styled.div`
  flex: 1;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1.5rem;
  line-height: 1.2;

  span {
    color: ${({ theme }) => theme.primaryColor};
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textColorLight};
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-left: auto;
    margin-right: auto;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;

  @media (max-width: 968px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${({ theme }) => theme.primaryColor};

  &.primary {
    background: ${({ theme }) => theme.primaryColor};
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }

  &.secondary {
    background: transparent;
    color: ${({ theme }) => theme.primaryColor};

    &:hover {
      background: ${({ theme }) => theme.primaryColor}10;
      transform: translateY(-2px);
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ImageContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 968px) {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primaryColor}15;
  filter: blur(80px);
  z-index: 0;

  &.shape1 {
    top: -100px;
    right: -100px;
  }

  &.shape2 {
    bottom: -100px;
    left: -100px;
    background: ${({ theme }) => theme.primaryColor}10;
  }
`;

const HeroSection = ({ onGetStarted, onLearnMore }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <HeroContainer>
      <BackgroundShape 
        className="shape1"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <BackgroundShape 
        className="shape2"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -90, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <ContentWrapper as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
        <TextContent>
          <Title variants={itemVariants}>
            Transform Your Content with <span>AI-Powered</span> Solutions
          </Title>
          <Subtitle variants={itemVariants}>
            Streamline your content creation process with our advanced AI tools. Create, manage, and optimize your content effortlessly.
          </Subtitle>
          <ButtonGroup variants={itemVariants}>
            <Button 
              className="primary"
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
            </Button>
            <Button 
              className="secondary"
              onClick={onLearnMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </Button>
          </ButtonGroup>
        </TextContent>
        <ImageContainer
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src="/assets/hero-image.png" 
            alt="AI Content Management Platform"
            loading="eager"
          />
        </ImageContainer>
      </ContentWrapper>
    </HeroContainer>
  );
};

HeroSection.propTypes = {
  onGetStarted: PropTypes.func.isRequired,
  onLearnMore: PropTypes.func.isRequired
};

export default HeroSection;
