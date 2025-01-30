import React from 'react';
import { FiEdit, FiLayout, FiCheckCircle } from 'react-icons/fi';
import {
  SectionContainer,
  SectionContent,
  SectionHeader,
  Title,
  Description,
  ProcessGrid,
  ProcessCard,
  ProcessIcon,
  ProcessTitle,
  ProcessDescription,
  StepNumber
} from './ProcessSection.styled';

const processes = [
  {
    icon: <FiEdit />,
    title: 'Content Creation',
    description: 'Our expert writers create engaging, SEO-optimized content tailored to your brand voice and target audience.',
    step: 1
  },
  {
    icon: <FiLayout />,
    title: 'Content Organization',
    description: 'We organize and structure your content using our intuitive management system for easy access and updates.',
    step: 2
  },
  {
    icon: <FiCheckCircle />,
    title: 'Review & Publish',
    description: 'After thorough review and optimization, your content is published and distributed across chosen channels.',
    step: 3
  }
];

const ProcessSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
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
    <SectionContainer>
      <SectionContent>
        <SectionHeader>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our <span>Process</span>
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We follow a streamlined process to ensure high-quality content delivery
          </Description>
        </SectionHeader>

        <ProcessGrid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {processes.map((process) => (
            <ProcessCard
              key={process.step}
              variants={itemVariants}
              style={{ position: 'relative' }}
            >
              <StepNumber>{process.step}</StepNumber>
              <ProcessIcon>{process.icon}</ProcessIcon>
              <ProcessTitle>{process.title}</ProcessTitle>
              <ProcessDescription>{process.description}</ProcessDescription>
            </ProcessCard>
          ))}
        </ProcessGrid>
      </SectionContent>
    </SectionContainer>
  );
};

export default ProcessSection;