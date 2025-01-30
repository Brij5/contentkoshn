import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ContactSection from '../components/ContactSection/ContactSection';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const HeaderSection = styled.section`
  background: ${({ theme }) => theme.cardBackground};
  padding: 6rem 2rem;
  text-align: center;
`;

const HeaderContent = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.textColor};
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.textMuted};
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const Contact = () => {
  return (
    <PageContainer>
      <HeaderSection>
        <HeaderContent
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Get in Touch</Title>
          <Subtitle>
            Have questions about our services? Want to learn more about how we can help your business?
            We'd love to hear from you. Reach out to us using any of the methods below.
          </Subtitle>
        </HeaderContent>
      </HeaderSection>

      <ContactSection />
    </PageContainer>
  );
};

export default Contact; 