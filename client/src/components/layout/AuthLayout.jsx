import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Logo from '../shared/Logo';
import Toast from '../Toast';
import { selectTheme } from '../../store/slices/themeSlice';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${({ theme }) => theme.authBackground};
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 480px;
  background: ${({ theme }) => theme.authCardBackground};
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const LogoContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.authHeaderBackground};
  
  img {
    height: 48px;
    width: auto;
  }
`;

const ContentContainer = styled.div`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const BackgroundPattern = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.05;
  background-image: ${({ $theme }) => 
    $theme === 'dark' 
      ? 'linear-gradient(45deg, #ffffff 25%, transparent 25%), linear-gradient(-45deg, #ffffff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ffffff 75%), linear-gradient(-45deg, transparent 75%, #ffffff 75%)'
      : 'linear-gradient(45deg, #000000 25%, transparent 25%), linear-gradient(-45deg, #000000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000000 75%), linear-gradient(-45deg, transparent 75%, #000000 75%)'
  };
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
`;

const AuthLayout = () => {
  const theme = useSelector(selectTheme);

  return (
    <LayoutContainer>
      <BackgroundPattern $theme={theme} />
      <AuthCard>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </AuthCard>
      <Toast />
    </LayoutContainer>
  );
};

export default AuthLayout; 