import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiTarget, FiEdit3, FiCheckCircle } from 'react-icons/fi';

const Section = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Description = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  color: #666;
  line-height: 1.6;
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #2196F3, #1976D2);
    z-index: 0;
    opacity: 0.3;
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const ProcessStep = styled(motion.div)`
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StepNumber = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2196F3, #1976D2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 4px 20px rgba(33, 150, 243, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid #2196F3;
    animation: pulse 2s infinite;
    opacity: 0;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
`;

const StepIcon = styled.div`
  font-size: 2rem;
  color: white;
`;

const StepTitle = styled.h3`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const StepDescription = styled.p`
  color: #666;
  line-height: 1.6;
  max-width: 300px;
  margin: 0 auto;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const stepVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.9
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: { 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  }
};

const ProcessSection = () => {
  const steps = [
    {
      icon: <FiMessageSquare />,
      title: 'Initial Consultation',
      description: 'We start with a detailed discussion to understand your content needs and goals.'
    },
    {
      icon: <FiTarget />,
      title: 'Strategy Development',
      description: 'We create a customized content strategy aligned with your business objectives.'
    },
    {
      icon: <FiEdit3 />,
      title: 'Content Creation',
      description: 'Our team creates high-quality content following the approved strategy.'
    },
    {
      icon: <FiCheckCircle />,
      title: 'Review & Launch',
      description: 'We review the content together and launch it to your target audience.'
    }
  ];

  return (
    <Section>
      <Container>
        <Title>How It Works</Title>
        <Description>
          Our streamlined process ensures efficient content creation and management,
          helping you achieve your goals faster.
        </Description>
        <ProcessSteps
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <ProcessStep key={index} variants={stepVariants}>
              <StepNumber variants={iconVariants}>
                <StepIcon>{step.icon}</StepIcon>
              </StepNumber>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </ProcessStep>
          ))}
        </ProcessSteps>
      </Container>
    </Section>
  );
};

export default ProcessSection;