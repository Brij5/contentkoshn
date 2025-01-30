import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import {
  Section,
  Container,
  Content,
  Title,
  Description,
  ButtonGroup,
  StyledButton,
  ImageWrapper,
  Image,
  Shapes,
  Shape
} from './HeroSection.styled';

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.4,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const HeroSection = () => {
  return (
    <Section>
      <Shapes>
        <Shape data-shape="1" />
        <Shape data-shape="2" />
      </Shapes>
      <Container>
        <Content>
          <Title
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            Transform Your <span>Content</span> Management
          </Title>
          <Description
            variants={descriptionVariants}
            initial="hidden"
            animate="visible"
          >
            Streamline your content workflow with our powerful platform. Create, manage,
            and publish content effortlessly across all your digital channels.
          </Description>
          <ButtonGroup
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            <StyledButton to="/signup" data-variant="primary">
              Get Started <FiArrowRight />
            </StyledButton>
            <StyledButton to="/about" data-variant="secondary">
              Learn More <FiArrowRight />
            </StyledButton>
          </ButtonGroup>
        </Content>
        <ImageWrapper
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <Image src="/images/hero-illustration.svg" alt="Content Management Platform" />
        </ImageWrapper>
      </Container>
    </Section>
  );
};

export default HeroSection;
