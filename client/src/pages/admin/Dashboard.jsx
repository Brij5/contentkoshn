import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiFileText, 
  FiPackage, 
  FiBarChart2,
  FiTrendingUp,
  FiTrendingDown
} from 'react-icons/fi';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StatTitle = styled.h3`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${({ theme, $color }) => theme.colors[$color]}20;
  color: ${({ theme, $color }) => theme.colors[$color]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme, $positive }) => 
    $positive ? theme.colors.success : theme.colors.error};
`;

const RecentActivity = styled.div`
  background: ${({ theme }) => theme.colors.card};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ActivityTitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: ${({ theme, $color }) => theme.colors[$color]}20;
  color: ${({ theme, $color }) => theme.colors[$color]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: { total: 0, change: 0 },
    content: { total: 0, change: 0 },
    services: { total: 0, change: 0 },
    revenue: { total: 0, change: 0 }
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Simulated data - replace with actual API calls
    setStats({
      users: { total: 1234, change: 12.5 },
      content: { total: 456, change: -5.2 },
      services: { total: 89, change: 8.7 },
      revenue: { total: 45600, change: 15.3 }
    });

    setActivities([
      {
        id: 1,
        type: 'user',
        text: 'New user registered: John Doe',
        time: '5 minutes ago',
        icon: <FiUsers />,
        color: 'primary'
      },
      {
        id: 2,
        type: 'content',
        text: 'New blog post published: "Getting Started with React"',
        time: '15 minutes ago',
        icon: <FiFileText />,
        color: 'info'
      },
      {
        id: 3,
        type: 'service',
        text: 'Service updated: Content Writing',
        time: '1 hour ago',
        icon: <FiPackage />,
        color: 'success'
      }
    ]);
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.users.total,
      change: stats.users.change,
      icon: <FiUsers size={20} />,
      color: 'primary'
    },
    {
      title: 'Content Items',
      value: stats.content.total,
      change: stats.content.change,
      icon: <FiFileText size={20} />,
      color: 'info'
    },
    {
      title: 'Active Services',
      value: stats.services.total,
      change: stats.services.change,
      icon: <FiPackage size={20} />,
      color: 'success'
    },
    {
      title: 'Monthly Revenue',
      value: `$${stats.revenue.total}`,
      change: stats.revenue.change,
      icon: <FiBarChart2 size={20} />,
      color: 'warning'
    }
  ];

  return (
    <DashboardContainer>
      <Header>
        <Title>Dashboard</Title>
      </Header>

      <StatsGrid>
        {statCards.map((stat, index) => (
          <StatCard
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatHeader>
              <StatTitle>{stat.title}</StatTitle>
              <StatIcon $color={stat.color}>{stat.icon}</StatIcon>
            </StatHeader>
            <StatValue>{stat.value}</StatValue>
            <StatChange $positive={stat.change > 0}>
              {stat.change > 0 ? <FiTrendingUp /> : <FiTrendingDown />}
              {Math.abs(stat.change)}% from last month
            </StatChange>
          </StatCard>
        ))}
      </StatsGrid>

      <RecentActivity>
        <ActivityHeader>
          <ActivityTitle>Recent Activity</ActivityTitle>
        </ActivityHeader>
        <ActivityList>
          {activities.map((activity, index) => (
            <ActivityItem
              key={activity.id}
              as={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ActivityIcon $color={activity.color}>
                {activity.icon}
              </ActivityIcon>
              <ActivityContent>
                <ActivityText>{activity.text}</ActivityText>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityContent>
            </ActivityItem>
          ))}
        </ActivityList>
      </RecentActivity>
    </DashboardContainer>
  );
};

export default AdminDashboard; 