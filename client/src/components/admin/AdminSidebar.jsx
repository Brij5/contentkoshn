import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FiGrid,
  FiFileText,
  FiUsers,
  FiSettings,
  FiBarChart2,
  FiPackage,
  FiMessageSquare,
  FiHelpCircle,
  FiChevronLeft,
  FiChevronRight,
  FiTag,
  FiGlobe
} from 'react-icons/fi';
import { selectSidebarOpen, toggleSidebar } from '../../store/slices/uiSlice';

const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: ${({ theme }) => theme.layout.headerHeight}px;
  bottom: 0;
  width: ${({ theme }) => theme.layout.sidebarWidth}px;
  background: ${({ theme }) => theme.sidebarBackground};
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;
  z-index: 100;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1024px) {
    box-shadow: ${({ $isOpen }) => 
      $isOpen ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none'};
  }
`;

const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbarColor};
    border-radius: 3px;
  }
`;

const NavSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textColorLight};
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  svg {
    color: ${({ theme }) => theme.textColorLight};
  }
  
  &:hover {
    background: ${({ theme }) => theme.primaryColor}10;
    color: ${({ theme }) => theme.primaryColor};
    
    svg {
      color: ${({ theme }) => theme.primaryColor};
    }
  }
  
  &.active {
    background: ${({ theme }) => theme.primaryColor}20;
    color: ${({ theme }) => theme.primaryColor};
    font-weight: 500;
    
    svg {
      color: ${({ theme }) => theme.primaryColor};
    }
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.primaryColor};
  border: none;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectSidebarOpen);

  const navItems = {
    overview: [
      { to: '/admin', icon: <FiGrid size={20} />, label: 'Dashboard' },
      { to: '/admin/analytics', icon: <FiBarChart2 size={20} />, label: 'Analytics' }
    ],
    content: [
      { to: '/admin/content', icon: <FiFileText size={20} />, label: 'Content' },
      { to: '/admin/categories', icon: <FiTag size={20} />, label: 'Categories' },
      { to: '/admin/comments', icon: <FiMessageSquare size={20} />, label: 'Comments' }
    ],
    management: [
      { to: '/admin/users', icon: <FiUsers size={20} />, label: 'Users' },
      { to: '/admin/services', icon: <FiPackage size={20} />, label: 'Services' },
      { to: '/admin/seo', icon: <FiGlobe size={20} />, label: 'SEO' }
    ],
    system: [
      { to: '/admin/settings', icon: <FiSettings size={20} />, label: 'Settings' },
      { to: '/admin/help', icon: <FiHelpCircle size={20} />, label: 'Help & Docs' }
    ]
  };

  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarContent>
        <NavSection>
          <SectionTitle>Overview</SectionTitle>
          {navItems.overview.map((item) => (
            <NavItem 
              key={item.to} 
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.icon}
              {item.label}
            </NavItem>
          ))}
        </NavSection>

        <NavSection>
          <SectionTitle>Content Management</SectionTitle>
          {navItems.content.map((item) => (
            <NavItem 
              key={item.to} 
              to={item.to}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.icon}
              {item.label}
            </NavItem>
          ))}
        </NavSection>

        <NavSection>
          <SectionTitle>Management</SectionTitle>
          {navItems.management.map((item) => (
            <NavItem 
              key={item.to} 
              to={item.to}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.icon}
              {item.label}
            </NavItem>
          ))}
        </NavSection>

        <NavSection>
          <SectionTitle>System</SectionTitle>
          {navItems.system.map((item) => (
            <NavItem 
              key={item.to} 
              to={item.to}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.icon}
              {item.label}
            </NavItem>
          ))}
        </NavSection>
      </SidebarContent>

      <ToggleButton onClick={() => dispatch(toggleSidebar())}>
        {isOpen ? <FiChevronLeft size={16} /> : <FiChevronRight size={16} />}
      </ToggleButton>
    </SidebarContainer>
  );
};

export default AdminSidebar; 