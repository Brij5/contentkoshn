import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import serviceService from '../../services/serviceService'; // Ensure correct path
import { toast } from 'react-toastify';
import ServiceCard from './ServiceCard';
import { motion } from 'framer-motion';

// Define keyframes for fade-in animation
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components
const Section = styled.section`
  padding: 4rem 0;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 2.5rem;
  margin-bottom: 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 5px solid ${({ theme }) => theme.colors.borderColor};
  border-top-color: ${({ theme }) => theme.colors.primaryColor};
  border-radius: 50%;
  margin: 2rem auto;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.errorColor};
  margin: 2rem 0;
`;

// ServicesSection component
const ServicesSection = ({ theme }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await serviceService.getActiveServices();
        console.log('Fetched services:', response); // Debug log
        if (!response || !Array.isArray(response.services)) {
          throw new Error('Invalid response format');
        }
        setServices(response.services);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to fetch services');
        toast.error('Failed to fetch services');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <Section>
      <Container>
        <Title theme={theme}>Our Services</Title>
        {loading ? (
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : error ? (
          <ErrorMessage theme={theme}>{error}</ErrorMessage>
        ) : services.length === 0 ? (
          <ErrorMessage theme={theme}>No services available</ErrorMessage>
        ) : (
          <Grid>
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </Grid>
        )}
      </Container>
    </Section>
  );
};

ServicesSection.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default ServicesSection;