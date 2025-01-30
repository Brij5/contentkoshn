import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background: #f8f9fa;
`;

const ErrorCode = styled(motion.h1)`
  font-size: 8rem;
  font-weight: bold;
  color: #f44336;
  margin: 0;
  line-height: 1;
`;

const Title = styled(motion.h2)`
  font-size: 2rem;
  color: #333;
  margin: 1rem 0;
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 500px;
`;

const Button = styled(motion(Link))`
  padding: 1rem 2rem;
  background-color: #f44336;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;

const Unauthorized = () => {
  return (
    <Container>
      <ErrorCode
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        401
      </ErrorCode>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Unauthorized Access
      </Title>
      <Description
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        You don't have permission to access this page. Please log in with an
        account that has the required permissions.
      </Description>
      <Button
        to="/"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Go to Homepage
      </Button>
    </Container>
  );
};

export default Unauthorized; 