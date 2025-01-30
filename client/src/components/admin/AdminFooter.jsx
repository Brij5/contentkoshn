import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiGithub, FiHelpCircle, FiBook } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.footerBackground};
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  padding: 1rem 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textColorLight};
  font-size: 0.875rem;
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const FooterLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textColorLight};
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

const Version = styled.span`
  background: ${({ theme }) => theme.primaryColor}20;
  color: ${({ theme }) => theme.primaryColor};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const AdminFooter = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLeft>
          <span>&copy; {new Date().getFullYear()} ContentKosh Admin</span>
          <Version>v1.0.0</Version>
        </FooterLeft>

        <FooterRight>
          <FooterLink to="/admin/docs">
            <FiBook size={16} />
            Documentation
          </FooterLink>
          <FooterLink to="/admin/help">
            <FiHelpCircle size={16} />
            Support
          </FooterLink>
          <FooterLink 
            to="https://github.com/yourusername/contentkosh" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub size={16} />
            GitHub
          </FooterLink>
        </FooterRight>
      </FooterContent>
    </FooterContainer>
  );
};

export default AdminFooter; 