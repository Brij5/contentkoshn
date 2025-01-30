import React from 'react';
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
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  color: #666;
`;

const Dashboard = () => {
  return (
    <Container>
      <Header />
      <Main>
        <Title>User Dashboard</Title>
        <DashboardGrid>
          <Card>
            <CardTitle>Profile</CardTitle>
            <CardContent>
              <p>Name: John Doe</p>
              <p>Email: john@example.com</p>
              <p>Member since: January 2024</p>
            </CardContent>
          </Card>
          <Card>
            <CardTitle>Recent Activity</CardTitle>
            <CardContent>
              <p>No recent activity</p>
            </CardContent>
          </Card>
          <Card>
            <CardTitle>Statistics</CardTitle>
            <CardContent>
              <p>Posts: 0</p>
              <p>Comments: 0</p>
              <p>Likes: 0</p>
            </CardContent>
          </Card>
        </DashboardGrid>
      </Main>
      <Footer />
    </Container>
  );
};

export default Dashboard; 