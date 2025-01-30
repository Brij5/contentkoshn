import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.fullScreen ? 'calc(100vh - 80px)' : '200px'};
  background: ${props => props.fullScreen ? '#f8f9fa' : 'transparent'};
`;

const Spinner = styled.div`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2196F3;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-left: 1rem;
  color: #666;
  font-size: 1.1rem;
`;

const LoadingSpinner = ({ size, fullScreen, text }) => {
  return (
    <SpinnerContainer fullScreen={fullScreen}>
      <Spinner size={size} />
      {text && <LoadingText>{text}</LoadingText>}
    </SpinnerContainer>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.string,
  fullScreen: PropTypes.bool,
  text: PropTypes.string
};

export default LoadingSpinner; 