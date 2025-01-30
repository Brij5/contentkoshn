import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

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

const IconWrapper = styled(motion.div)`
  font-size: 4rem;
  color: #f44336;
  margin-bottom: 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 500px;
`;

const RetryButton = styled(motion.button)`
  padding: 1rem 2rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d32f2f;
  }
`;

const ErrorDetails = styled(motion.pre)`
  background: #f1f1f1;
  padding: 1rem;
  border-radius: 4px;
  max-width: 90%;
  overflow-x: auto;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Container>
      <IconWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FiAlertTriangle />
      </IconWrapper>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Something went wrong
      </Title>
      <Description
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        An unexpected error occurred. Our team has been notified and is working to fix the issue.
      </Description>
      <RetryButton
        onClick={resetErrorBoundary}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Try Again
      </RetryButton>
      {error && process.env.NODE_ENV === 'development' && (
        <ErrorDetails
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {error.toString()}
        </ErrorDetails>
      )}
    </Container>
  );
};

export default ErrorFallback; 