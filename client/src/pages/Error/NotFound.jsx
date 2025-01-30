import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const Title = styled.h1`
  font-size: 6rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 500px;
`;

const HomeLink = styled(Link)`
  padding: 1rem 2rem;
  background-color: #2196F3;
  color: white;
  border-radius: 4px;
  font-size: 1.1rem;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1976D2;
  }
`;

const NotFound = () => {
  return (
    <Container>
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Description>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </Description>
      <HomeLink to="/">Go to Homepage</HomeLink>
    </Container>
  );
};

export default NotFound;