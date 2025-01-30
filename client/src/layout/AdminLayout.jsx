import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminFooter from '../components/admin/AdminFooter';
import Toast from '../shared/Toast';
import LoadingSpinner from '../shared/LoadingSpinner';
import { selectUser, selectIsAuthenticated } from '../store/slices/authSlice';
import { selectSidebarOpen } from '../store/slices/uiSlice';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  margin-left: ${({ $sidebarOpen, theme }) => 
    $sidebarOpen ? `${theme.layout.sidebarWidth}px` : '0'};
  margin-top: ${({ theme }) => theme.layout.headerHeight}px;
  transition: margin-left 0.3s ease;
  flex: 1;
  
  @media (max-width: 1024px) {
    margin-left: 0;
  }
`;

const ContentWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const AdminLayout = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const sidebarOpen = useSelector(selectSidebarOpen);

  useEffect(() => {
    // Redirect if not authenticated or not an admin
    if (!isAuthenticated) {
      navigate('/auth/login');
    } else if (user?.role !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) {
    return <LoadingSpinner fullScreen text="Authenticating..." />;
  }

  if (user.role !== 'admin') {
    return <LoadingSpinner fullScreen text="Access denied. Redirecting..." />;
  }

  return (
    <LayoutContainer>
      <AdminHeader />
      <AdminSidebar />
      <MainContent $sidebarOpen={sidebarOpen}>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
        <AdminFooter />
      </MainContent>
      <Toast />
    </LayoutContainer>
  );
};

export default AdminLayout; 