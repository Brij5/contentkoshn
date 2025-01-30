import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.cardBackground};
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primaryColor};
  text-decoration: none;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.cardBackground};
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &.open {
      display: flex;
    }
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  font-weight: 400;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &[data-active="true"] {
    color: ${({ theme }) => theme.primaryColor};
    font-weight: 600;
  }

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
    background: ${({ theme }) => theme.backgroundHover};
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  
  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  background: transparent;
  color: ${({ theme }) => theme.primaryColor};
  border: 1px solid ${({ theme }) => theme.primaryColor};

  &.primary {
    background: ${({ theme }) => theme.primaryColor};
    color: white;
    border: none;
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">ContentKosh</Logo>

        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>

        <NavLinks className={isMenuOpen ? 'open' : ''}>
          <NavLink to="/" data-active={isActive('/')}>
            Home
          </NavLink>
          <NavLink to="/about" data-active={isActive('/about')}>
            About
          </NavLink>
          <NavLink to="/services" data-active={isActive('/services')}>
            Services
          </NavLink>
          <NavLink to="/pricing" data-active={isActive('/pricing')}>
            Pricing
          </NavLink>
          <NavLink to="/blog" data-active={isActive('/blog')}>
            Blog
          </NavLink>
          <NavLink to="/contact" data-active={isActive('/contact')}>
            Contact
          </NavLink>

          <UserMenu>
            <ThemeToggle onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </ThemeToggle>

            {user ? (
              <>
                <NavLink to="/dashboard" data-active={isActive('/dashboard')}>
                  Dashboard
                </NavLink>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <AuthButtons>
                <Button onClick={() => navigate('/login')}>Login</Button>
                <Button className="primary" onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </AuthButtons>
            )}
          </UserMenu>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;