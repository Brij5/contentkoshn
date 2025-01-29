import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBox, FiLayers, FiShield } from 'react-icons/fi';

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
`;

const Header = styled.header`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  color: ${({ theme }) => theme.primaryColor};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

const Button = styled(Link)`
  background: ${({ theme }) => theme.primaryColor};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Hero = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const HeroTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.textColorLight};
  max-width: 600px;
  margin: 0 auto 3rem;
`;

const Features = styled.section`
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.backgroundSecondary};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadowMd};

  svg {
    color: ${({ theme }) => theme.primaryColor};
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: ${({ theme }) => theme.textColor};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: 1rem;
  }

  p {
    color: ${({ theme }) => theme.textColorLight};
    line-height: 1.6;
  }
`;

const CTASection = styled.section`
  padding: 6rem 2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.primaryGradient};
  color: white;
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Home = () => {
  return (
    <Container>
      <Header>
        <Logo>ContentKosh</Logo>
        <Nav>
          <NavLink to="/features">Features</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/about">About</NavLink>
          <Button to="/auth/login">Sign In</Button>
        </Nav>
      </Header>

      <Hero>
        <HeroTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Manage Your Content with Ease
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          A powerful content management system that helps you create, organize, and
          publish content efficiently.
        </HeroSubtitle>
        <CTAButton
          to="/auth/register"
          as={motion.a}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Get Started <FiArrowRight />
        </CTAButton>
      </Hero>

      <Features>
        <FeaturesGrid>
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <FiBox />
            <h3>Easy Content Management</h3>
            <p>
              Create, edit, and organize your content with our intuitive interface.
              Manage multiple content types with ease.
            </p>
          </FeatureCard>

          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FiLayers />
            <h3>Flexible Organization</h3>
            <p>
              Organize your content with custom categories, tags, and hierarchical
              structures. Find what you need quickly.
            </p>
          </FeatureCard>

          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FiShield />
            <h3>Secure & Reliable</h3>
            <p>
              Your content is safe with us. Enjoy secure storage, regular backups,
              and role-based access control.
            </p>
          </FeatureCard>
        </FeaturesGrid>
      </Features>

      <CTASection>
        <HeroTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Ready to Get Started?
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Join thousands of users who trust ContentKosh for their content management needs.
        </HeroSubtitle>
        <CTAButton
          to="/auth/register"
          as={motion.a}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Create Your Account <FiArrowRight />
        </CTAButton>
      </CTASection>
    </Container>
  );
};

export default Home; 