import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiMenu, FiBell, FiSearch, FiPlus } from 'react-icons/fi';
import Logo from '../shared/Logo';
import UserMenu from '../Header/UserMenu';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { selectUser } from '../../store/slices/authSlice';

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
  align-items: center;
  justify-content: center;
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
`;

const SearchContainer = styled.div`
  position: relative;
  width: 400px;
  max-width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 6px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.textColorLight};
`;

const CreateButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.primaryColor};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primaryColorDark};
    transform: translateY(-1px);
  }
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;
  
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

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleNotificationsClick = () => {
    navigate('/admin/notifications');
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
        <SearchContainer>
          <SearchIcon size={16} />
          <SearchInput 
            type="text" 
            placeholder="Search in admin panel..." 
          />
        </SearchContainer>
      </HeaderCenter>

      <HeaderRight>
        <CreateButton to="/admin/content/create">
          <FiPlus size={18} />
          Create Content
        </CreateButton>

        <NotificationButton onClick={handleNotificationsClick}>
          <FiBell size={20} />
          {user?.unreadAdminNotifications > 0 && (
            <NotificationBadge>
              {user.unreadAdminNotifications}
            </NotificationBadge>
          )}
        </NotificationButton>

        <UserMenu />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default AdminHeader; 