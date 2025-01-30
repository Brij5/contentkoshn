import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  padding: 1rem;
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const StepIcon = styled.i`
  font-size: 2rem;
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

const ProcessSection = () => {
  const steps = [
    {
      icon: 'fas fa-comments',
      title: 'Initial Consultation',
      description: 'We start with a detailed discussion to understand your content needs and goals.'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Strategy Development',
      description: 'Our team creates a customized content strategy aligned with your objectives.'
    },
    {
      icon: 'fas fa-pen-fancy',
      title: 'Content Creation',
      description: 'Expert writers craft engaging content that resonates with your target audience.'
    },
    {
      icon: 'fas fa-check-circle',
      title: 'Review & Delivery',
      description: 'Quality checks and revisions ensure the content meets your expectations.'
    }
  ];

  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Our Process</Title>
          <Description>
            We follow a systematic approach to deliver high-quality content that drives results.
          </Description>
        </motion.div>
        <ProcessSteps>
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <StepNumber
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <StepIcon className={step.icon} />
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