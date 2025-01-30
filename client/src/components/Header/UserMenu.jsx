import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FiUser, 
  FiSettings, 
  FiHelpCircle, 
  FiLogOut,
  FiChevronDown,
  FiShield,
  FiMoon,
  FiSun
} from 'react-icons/fi';
import { logout } from '../../store/slices/authSlice';
import { selectUser } from '../../store/slices/authSlice';
import { selectTheme, setThemeMode } from '../../store/slices/themeSlice';
import { addToast } from '../../store/slices/uiSlice';

const MenuContainer = styled.div`
  position: relative;
`;

const MenuTrigger = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.textColor};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primaryColor}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primaryColor};
  font-weight: 600;
  font-size: 0.875rem;
`;

const UserInfo = styled.div`
  display: none;
  text-align: left;
  
  @media (min-width: 768px) {
    display: block;
  }
`;

const UserName = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
`;

const UserRole = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textColorLight};
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: ${({ theme }) => theme.dropdownBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
  overflow: hidden;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

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
`;

const MenuDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.borderColor};
  margin: 0.5rem 0;
`;

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      dispatch(addToast({
        type: 'success',
        message: 'Successfully logged out'
      }));
      navigate('/auth/login');
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        message: 'Failed to logout. Please try again.'
      }));
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleTheme = () => {
    dispatch(setThemeMode(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <MenuContainer ref={menuRef}>
      <MenuTrigger onClick={() => setIsOpen(!isOpen)}>
        <Avatar>
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            getInitials(user?.name || 'User Name')
          )}
        </Avatar>
        <UserInfo>
          <UserName>{user?.name}</UserName>
          <UserRole>{user?.role}</UserRole>
        </UserInfo>
        <FiChevronDown />
      </MenuTrigger>

      {isOpen && (
        <MenuDropdown>
          <MenuItem onClick={() => navigate('/profile')}>
            <FiUser size={18} />
            Profile
          </MenuItem>
          <MenuItem onClick={() => navigate('/settings')}>
            <FiSettings size={18} />
            Settings
          </MenuItem>
          <MenuItem onClick={toggleTheme}>
            {theme === 'light' ? (
              <>
                <FiMoon size={18} />
                Dark Mode
              </>
            ) : (
              <>
                <FiSun size={18} />
                Light Mode
              </>
            )}
          </MenuItem>
          
          {user?.role === 'admin' && (
            <>
              <MenuDivider />
              <MenuItem onClick={() => navigate('/admin')}>
                <FiShield size={18} />
                Admin Dashboard
              </MenuItem>
            </>
          )}

          <MenuDivider />
          <MenuItem onClick={() => navigate('/help')}>
            <FiHelpCircle size={18} />
            Help & Support
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <FiLogOut size={18} />
            Logout
          </MenuItem>
        </MenuDropdown>
      )}
    </MenuContainer>
  );
};

export default UserMenu; 