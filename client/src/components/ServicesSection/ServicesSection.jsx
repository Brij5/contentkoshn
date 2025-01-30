import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import serviceService from '../../services/serviceService';
import { toast } from 'react-toastify';
import ServiceCard from './ServiceCard';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 4rem 0;
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top-color: #2196F3;
  border-radius: 50%;
  margin: 2rem auto;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #f44336;
  margin: 2rem 0;
  font-size: 1.1rem;
`;

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await serviceService.getActiveServices();
        setServices(response.services);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to load services. Please try again later.');
        toast.error('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <Section>
        <Container>
          <Title>Our Services</Title>
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <Container>
          <Title>Our Services</Title>
          <ErrorMessage>{error}</ErrorMessage>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <Title>Our Services</Title>
        <Grid>
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default ServicesSection;