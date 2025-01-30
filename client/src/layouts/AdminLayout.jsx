import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  FiMenu,
  FiX,
  FiHome,
  FiUsers,
  FiSettings,
  FiFileText,
  FiLogOut,
  FiBell,
  FiUser
} from 'react-icons/fi';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
`;

const Sidebar = styled(motion.aside)`
  width: 280px;
  background: ${({ theme }) => theme.cardBackground};
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    position: fixed;
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColorLight};
  cursor: pointer;
  padding: 0.5rem;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    color: ${({ theme }) => theme.textColor};
  }
`;

const Navigation = styled.nav`
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${({ theme, active }) => active ? theme.primaryColor : theme.textColorLight};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: ${({ active }) => active ? '600' : '500'};
  background: ${({ theme, active }) => active ? theme.primaryColor + '10' : 'transparent'};

  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
    color: ${({ theme }) => theme.textColor};
  }
`;

const Header = styled.header`
  height: 64px;
  background: ${({ theme }) => theme.cardBackground};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: fixed;
  top: 0;
  right: 0;
  left: ${({ sidebarWidth }) => sidebarWidth}px;
  z-index: 90;

  @media (max-width: 768px) {
    left: 0;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColorLight};
  cursor: pointer;
  padding: 0.5rem;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    color: ${({ theme }) => theme.textColor};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColorLight};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
    color: ${({ theme }) => theme.textColor};
  }
`;

const Content = styled.main`
  flex: 1;
  margin-left: ${({ sidebarWidth }) => sidebarWidth}px;
  padding: 84px 1.5rem 1.5rem;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const SIDEBAR_WIDTH = 280;

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { path: '/admin', icon: <FiHome />, label: 'Dashboard' },
    { path: '/admin/users', icon: <FiUsers />, label: 'Users' },
    { path: '/admin/content', icon: <FiFileText />, label: 'Content' },
    { path: '/admin/settings', icon: <FiSettings />, label: 'Settings' }
  ];

  return (
    <Container>
      <AnimatePresence>
        {isSidebarOpen && (
          <Sidebar
            initial={{ x: -SIDEBAR_WIDTH }}
            animate={{ x: 0 }}
            exit={{ x: -SIDEBAR_WIDTH }}
            transition={{ type: 'tween' }}
            isOpen={isSidebarOpen}
          >
            <SidebarHeader>
              <Logo to="/admin">
                ContentKosh
              </Logo>
              <CloseButton onClick={() => setIsSidebarOpen(false)}>
                <FiX size={24} />
              </CloseButton>
            </SidebarHeader>

            <Navigation>
              {navItems.map(({ path, icon, label }) => (
                <NavItem
                  key={path}
                  to={path}
                  active={location.pathname === path ? 1 : 0}
                >
                  {icon}
                  {label}
                </NavItem>
              ))}
            </Navigation>
          </Sidebar>
        )}
      </AnimatePresence>

      <Header sidebarWidth={isSidebarOpen ? SIDEBAR_WIDTH : 0}>
        <MenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FiMenu size={24} />
        </MenuButton>

        <HeaderActions>
          <IconButton>
            <FiBell size={20} />
          </IconButton>
          <IconButton>
            <FiUser size={20} />
          </IconButton>
          <IconButton onClick={handleLogout}>
            <FiLogOut size={20} />
          </IconButton>
        </HeaderActions>
      </Header>

      <Content sidebarWidth={isSidebarOpen ? SIDEBAR_WIDTH : 0}>
        {children}
      </Content>
    </Container>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AdminLayout; 