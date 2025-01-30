import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiWifiOff } from 'react-icons/fi';

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
  color: #2196F3;
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
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1976D2;
  }
`;

const ConnectionError = ({ onRetry }) => {
  return (
    <Container>
      <IconWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FiWifiOff />
      </IconWrapper>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Connection Error
      </Title>
      <Description
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Unable to connect to the server. Please check your internet connection and try again.
      </Description>
      <RetryButton
        onClick={onRetry}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Retry Connection
      </RetryButton>
    </Container>
  );
};

export default ConnectionError; 