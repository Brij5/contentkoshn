import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
`;

const Feature = styled.li`
  color: #555;
  margin-bottom: 0.5rem;
  &:before {
    content: "✓";
    color: #4CAF50;
    margin-right: 0.5rem;
  }
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #2196F3;
  margin-top: auto;
`;

const ServiceCard = ({ service }) => {
  return (
    <Card
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Icon>{service.icon}</Icon>
      <Title>{service.title}</Title>
      <Description>{service.description}</Description>
      <FeaturesList>
        {service.features.map((feature, index) => (
          <Feature key={index}>{feature}</Feature>
        ))}
      </FeaturesList>
      <Price>{service.price}</Price>
    </Card>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServiceCard;
