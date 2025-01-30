import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ color }) => color};
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ color }) => `${color}15`};
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: auto;
  width: 100%;
`;

const Feature = styled.li`
  color: #555;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: "✓";
    color: ${({ color }) => color};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

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

const ServiceCard = ({ icon, title, description, features, color, index }) => {
  return (
    <Card
      variants={cardVariants}
      color={color}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
    >
      <IconWrapper color={color}>
        {icon}
      </IconWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <FeaturesList>
        {features.map((feature, i) => (
          <Feature key={i} color={color}>
            {feature}
          </Feature>
        ))}
      </FeaturesList>
    </Card>
  );
};

ServiceCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  color: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default ServiceCard;
