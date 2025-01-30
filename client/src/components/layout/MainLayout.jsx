import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Toast from '../Toast';
import { selectSidebarOpen, selectLayout } from '../../store/slices/uiSlice';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  margin-top: ${({ $headerHeight }) => $headerHeight}px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: ${({ $padding }) => $padding}px;
  margin-left: ${({ $sidebarWidth, $sidebarOpen }) => 
    $sidebarOpen ? $sidebarWidth : 0}px;
  transition: margin-left 0.3s ease;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: ${({ $padding }) => $padding / 2}px;
  }
`;

const MainLayout = () => {
  const sidebarOpen = useSelector(selectSidebarOpen);
  const { headerHeight, contentPadding, sidebarWidth } = useSelector(selectLayout);

  return (
    <LayoutContainer>
      <Header />
      <MainContent $headerHeight={headerHeight}>
        <Sidebar />
        <ContentWrapper
          $padding={contentPadding}
          $sidebarWidth={sidebarWidth}
          $sidebarOpen={sidebarOpen}
        >
          <Outlet />
        </ContentWrapper>
      </MainContent>
      <Footer />
      <Toast />
    </LayoutContainer>
  );
};

export default MainLayout; 