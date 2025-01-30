import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import AdminHeader from '../admin/AdminHeader';
import AdminSidebar from '../admin/AdminSidebar';
import AdminFooter from '../admin/AdminFooter';
import Toast from '../Toast';
import LoadingSpinner from '../LoadingSpinner';
import { selectSidebarOpen, selectLayout } from '../../store/slices/uiSlice';
import { selectUser, selectIsAuthenticated } from '../../store/slices/authSlice';
import { fetchAdminStats } from '../../store/slices/adminSlice';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.adminBackground};
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
  background: ${({ theme }) => theme.adminContentBackground};
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: ${({ $padding }) => $padding / 2}px;
  }
`;

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarOpen = useSelector(selectSidebarOpen);
  const { headerHeight, contentPadding, sidebarWidth } = useSelector(selectLayout);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    // Redirect non-admin users
    if (isAuthenticated && user?.role !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    // Fetch admin dashboard stats when component mounts
    if (user?.role === 'admin') {
      dispatch(fetchAdminStats());
    }
  }, [dispatch, user]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <LoadingSpinner />;
  }

  return (
    <LayoutContainer>
      <AdminHeader />
      <MainContent $headerHeight={headerHeight}>
        <AdminSidebar />
        <ContentWrapper
          $padding={contentPadding}
          $sidebarWidth={sidebarWidth}
          $sidebarOpen={sidebarOpen}
        >
          <Outlet />
        </ContentWrapper>
      </MainContent>
      <AdminFooter />
      <Toast />
    </LayoutContainer>
  );
};

export default AdminLayout; 