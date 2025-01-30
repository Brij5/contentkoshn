import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from '../components/shared/Toast';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  margin-top: ${({ theme }) => theme.layout.headerHeight}px;
`;

const ContentWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MainLayout = () => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainContent>
      <Footer />
      <Toast />
    </LayoutContainer>
  );
};

export default MainLayout; 