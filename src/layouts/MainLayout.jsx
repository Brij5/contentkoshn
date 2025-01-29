import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from '../components/Header/Header';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.backgroundColor};
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  padding: 2rem 0;
  background: ${({ theme }) => theme.backgroundColor};
`;

const Footer = styled.footer`
  background: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.textColor};
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;

  p {
    margin: 0;
    opacity: 0.8;
  }
`;

const MainLayout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>{children}</Main>
      <Footer>
        <FooterContent>
          <p>&copy; {new Date().getFullYear()} ContentKosh. All rights reserved.</p>
        </FooterContent>
      </Footer>
    </LayoutContainer>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout; 