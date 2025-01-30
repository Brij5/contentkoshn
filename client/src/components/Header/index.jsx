import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiMenu, FiSun, FiMoon, FiBell, FiSearch } from 'react-icons/fi';
import Logo from '../shared/Logo';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { selectTheme, setThemeMode } from '../../store/slices/themeSlice';
import { selectUser, selectIsAuthenticated } from '../../store/slices/authSlice';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ theme }) => theme.layout.headerHeight}px;
  background: ${({ theme }) => theme.headerBackground};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeaderCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    color: ${({ theme }) => theme.primaryColor};
    transform: translateY(-1px);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: ${({ theme }) => theme.errorColor};
  color: white;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 1rem;
  transform: translate(50%, -50%);
`;

const Navigation = styled.nav`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover, &.active {
    color: ${({ theme }) => theme.primaryColor};
    background: ${({ theme }) => theme.primaryColor}10;
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(selectTheme);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleThemeToggle = () => {
    dispatch(setThemeMode(theme === 'light' ? 'dark' : 'light'));
  };

  const handleNotificationsClick = () => {
    navigate('/notifications');
  };

  return (
    <HeaderContainer>
      <HeaderLeft>
        <MenuButton onClick={() => dispatch(toggleSidebar())}>
          <FiMenu size={24} />
        </MenuButton>
        <Logo size="small" />
      </HeaderLeft>

      <HeaderCenter>
        <Navigation>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </Navigation>
      </HeaderCenter>

      <HeaderRight>
        <SearchBar />
        
        <IconButton onClick={handleThemeToggle}>
          {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </IconButton>

        {isAuthenticated && (
          <>
            <IconButton onClick={handleNotificationsClick}>
              <FiBell size={20} />
              {user?.unreadNotifications > 0 && (
                <NotificationBadge>
                  {user.unreadNotifications}
                </NotificationBadge>
              )}
            </IconButton>
            <UserMenu />
          </>
        )}
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header; 