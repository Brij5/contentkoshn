import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 6rem;
  color: #2196F3;
  margin: 0;
  line-height: 1;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin: 1rem 0;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #2196F3;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1976D2;
  }
`;

const NotFound = () => {
  return (
    <Container>
      <Header />
      <Main>
        <Title>404</Title>
        <Subtitle>Page Not Found</Subtitle>
        <Description>
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </Description>
        <HomeLink to="/">Return to Homepage</HomeLink>
      </Main>
      <Footer />
    </Container>
  );
};

export default NotFound; 