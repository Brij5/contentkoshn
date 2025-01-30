import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import styled from 'styled-components';

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const MainLayout = () => {
  return (
    <MainContainer>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </MainContainer>
  );
};

export default MainLayout; 