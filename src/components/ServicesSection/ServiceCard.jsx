import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div`
  background: ${({ theme }) => theme.backgroundPrimary};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textColor};
  opacity: 0.8;
  line-height: 1.6;
`;

const ServiceCard = ({ service }) => {
  const { title, description, icon } = service;

  return (
    <Card>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired
};

export default ServiceCard;
