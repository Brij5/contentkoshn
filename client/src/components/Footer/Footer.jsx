import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiFacebook } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: #1a1a1a;
  color: white;
  padding: 4rem 2rem 2rem;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 4rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
`;

const Description = styled.p`
  color: #999;
  line-height: 1.6;
  font-size: 0.875rem;
`;

const Title = styled.h3`
  color: white;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled(Link)`
  color: #999;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;

  &:hover {
    color: #2196F3;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: #999;
  font-size: 1.25rem;
  transition: color 0.2s;

  &:hover {
    color: #2196F3;
  }
`;

const BottomBar = styled.div`
  max-width: 1200px;
  margin: 4rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 0.875rem;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: #999;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const LegalLink = styled(Link)`
  color: #999;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #2196F3;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Content>
        <Column>
          <Logo to="/">ContentKosh</Logo>
          <Description>
            Streamline your content management process with our powerful platform.
            Create, manage, and deliver content effortlessly.
          </Description>
          <SocialLinks>
            <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FiGithub />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FiLinkedin />
            </SocialLink>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FiFacebook />
            </SocialLink>
          </SocialLinks>
        </Column>

        <Column>
          <Title>Product</Title>
          <LinkList>
            <li><FooterLink to="/features">Features</FooterLink></li>
            <li><FooterLink to="/pricing">Pricing</FooterLink></li>
            <li><FooterLink to="/integrations">Integrations</FooterLink></li>
            <li><FooterLink to="/changelog">Changelog</FooterLink></li>
            <li><FooterLink to="/docs">Documentation</FooterLink></li>
          </LinkList>
        </Column>

        <Column>
          <Title>Company</Title>
          <LinkList>
            <li><FooterLink to="/about">About Us</FooterLink></li>
            <li><FooterLink to="/blog">Blog</FooterLink></li>
            <li><FooterLink to="/careers">Careers</FooterLink></li>
            <li><FooterLink to="/contact">Contact</FooterLink></li>
            <li><FooterLink to="/partners">Partners</FooterLink></li>
          </LinkList>
        </Column>

        <Column>
          <Title>Resources</Title>
          <LinkList>
            <li><FooterLink to="/help">Help Center</FooterLink></li>
            <li><FooterLink to="/community">Community</FooterLink></li>
            <li><FooterLink to="/status">Status</FooterLink></li>
            <li><FooterLink to="/webinars">Webinars</FooterLink></li>
            <li><FooterLink to="/newsletter">Newsletter</FooterLink></li>
          </LinkList>
        </Column>
      </Content>

      <BottomBar>
        <Copyright>
          © {new Date().getFullYear()} ContentKosh. All rights reserved.
        </Copyright>
        <LegalLinks>
          <LegalLink to="/terms">Terms of Service</LegalLink>
          <LegalLink to="/privacy">Privacy Policy</LegalLink>
          <LegalLink to="/security">Security</LegalLink>
        </LegalLinks>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;