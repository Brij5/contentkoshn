import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import {
  FooterContainer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterLink,
  FooterText,
  SocialLinks,
  SocialIcon,
  BottomBar
} from './Footer.styled';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>ContentKosh</FooterTitle>
          <FooterText>
            Your one-stop solution for managing and delivering high-quality content.
            We help businesses grow through effective content strategies.
          </FooterText>
          <SocialLinks>
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/services">Services</FooterLink>
          <FooterLink to="/pricing">Pricing</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Services</FooterTitle>
          <FooterLink to="/services#content-writing">Content Writing</FooterLink>
          <FooterLink to="/services#copywriting">Copywriting</FooterLink>
          <FooterLink to="/services#seo">SEO Services</FooterLink>
          <FooterLink to="/services#social-media">Social Media</FooterLink>
          <FooterLink to="/services#email-marketing">Email Marketing</FooterLink>
          <FooterLink to="/services#content-strategy">Content Strategy</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <FooterText>
            123 Content Street
            <br />
            Digital City, DC 12345
            <br />
            <br />
            Email: info@contentkosh.com
            <br />
            Phone: (123) 456-7890
          </FooterText>
        </FooterSection>
      </FooterContent>

      <BottomBar>
        <FooterText>
          © {currentYear} ContentKosh. All rights reserved.
        </FooterText>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;