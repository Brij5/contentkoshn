import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LogoContainer = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.primaryColor};
  font-weight: 700;
  font-size: ${({ $size }) => $size === 'large' ? '2rem' : '1.5rem'};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const LogoImage = styled.img`
  height: ${({ $size }) => $size === 'large' ? '48px' : '36px'};
  width: auto;
  margin-right: 0.5rem;
`;

const LogoText = styled.span`
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(45deg, ${({ theme }) => theme.primaryColor}, ${({ theme }) => theme.secondaryColor});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Logo = ({ size = 'medium', showText = true, className }) => {
  return (
    <LogoContainer to="/" $size={size} className={className}>
      <LogoImage 
        src="/logo.svg" 
        alt="ContentKoshn Logo" 
        $size={size}
      />
      {showText && <LogoText>ContentKoshn</LogoText>}
    </LogoContainer>
  );
};

Logo.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  showText: PropTypes.bool,
  className: PropTypes.string
};

export default Logo; 