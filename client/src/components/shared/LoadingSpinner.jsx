import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ $fullScreen }) => $fullScreen ? '100vh' : '200px'};
  width: 100%;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Spinner = styled.div`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: ${({ $thickness }) => $thickness}px solid ${({ theme }) => theme.spinnerTrackColor};
  border-top: ${({ $thickness }) => $thickness}px solid ${({ theme }) => theme.primaryColor};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const SpinnerText = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ $size }) => $size === 'large' ? '1.1rem' : '0.9rem'};
  font-weight: 500;
`;

const LoadingSpinner = ({ 
  size = 'medium', 
  fullScreen = false, 
  text = 'Loading...',
  showText = true 
}) => {
  const spinnerSizes = {
    small: 24,
    medium: 36,
    large: 48
  };

  const spinnerThickness = {
    small: 2,
    medium: 3,
    large: 4
  };

  return (
    <SpinnerContainer $fullScreen={fullScreen}>
      <SpinnerWrapper>
        <Spinner 
          $size={spinnerSizes[size]} 
          $thickness={spinnerThickness[size]}
        />
        {showText && text && (
          <SpinnerText $size={size}>
            {text}
          </SpinnerText>
        )}
      </SpinnerWrapper>
    </SpinnerContainer>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullScreen: PropTypes.bool,
  text: PropTypes.string,
  showText: PropTypes.bool
};

export default LoadingSpinner; 