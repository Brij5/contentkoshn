import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiEdit, FiLayout, FiImage, FiPieChart, FiLayers, FiGlobe, FiArrowRight } from 'react-icons/fi';

const Section = styled.section`
  padding: 6rem 2rem;
  background: #ffffff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    border-color: ${({ color }) => color || '#2196F3'};
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: ${({ color }) => `${color}15`};
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
`;

const LearnMoreButton = styled.button`
  background: none;
  border: none;
  color: ${({ color }) => color || '#2196F3'};
  font-weight: 500;
  margin-top: auto;
  padding-top: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const services = [
  {
    icon: <FiEdit />,
    title: 'Content Creation',
    description: 'Create engaging content with our intuitive editor and AI-powered writing assistance.',
    color: '#2196F3'
  },
  {
    icon: <FiLayout />,
    title: 'Visual Editor',
    description: 'Design beautiful layouts with our drag-and-drop visual editor and templates.',
    color: '#4CAF50'
  },
  {
    icon: <FiImage />,
    title: 'Media Management',
    description: 'Organize and optimize your media assets with advanced management tools.',
    color: '#FFC107'
  },
  {
    icon: <FiPieChart />,
    title: 'Analytics',
    description: 'Track content performance with detailed analytics and insights.',
    color: '#9C27B0'
  },
  {
    icon: <FiLayers />,
    title: 'Version Control',
    description: 'Keep track of changes with built-in version control and collaboration features.',
    color: '#F44336'
  },
  {
    icon: <FiGlobe />,
    title: 'Multi-platform',
    description: 'Publish content across multiple platforms with seamless integration.',
    color: '#00BCD4'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const ServicesSection = () => {
  return (
    <Section>
      <Container>
        <Title>Our Services</Title>
        <Description>
          Comprehensive content management solutions to help you create, manage, and deliver content effectively.
        </Description>
        <Grid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              variants={cardVariants}
              color={service.color}
            >
              <IconWrapper color={service.color}>
                {service.icon}
              </IconWrapper>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <LearnMoreButton color={service.color}>
                Learn More <FiArrowRight />
              </LearnMoreButton>
            </ServiceCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default ServicesSection;