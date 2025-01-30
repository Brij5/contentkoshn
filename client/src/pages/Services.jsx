import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import { FiEdit, FiLayout, FiImage, FiPieChart, FiLayers, FiGlobe } from 'react-icons/fi';

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

const DetailedSection = styled.section`
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.cardBackground};

  &[data-alternate="true"] {
    background: ${({ theme }) => theme.background};
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ServiceCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ServiceIcon = styled.div`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ServiceTitle = styled.h3`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.textMuted};
  line-height: 1.6;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const ServiceFeature = styled.li`
  color: ${({ theme }) => theme.textColor};
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: "•";
    color: ${({ theme }) => theme.primaryColor};
  }
`;

const services = [
  {
    icon: <FiEdit />,
    title: "Content Writing",
    description: "Professional content writing services tailored to your needs.",
    features: [
      "Blog Posts & Articles",
      "Website Content",
      "Product Descriptions",
      "Technical Writing"
    ]
  },
  {
    icon: <FiLayout />,
    title: "Copywriting",
    description: "Compelling copy that drives engagement and conversions.",
    features: [
      "Sales Copy",
      "Email Campaigns",
      "Landing Pages",
      "Ad Copy"
    ]
  },
  {
    icon: <FiPieChart />,
    title: "SEO Services",
    description: "Optimize your content for better search engine visibility.",
    features: [
      "Keyword Research",
      "On-Page SEO",
      "Content Optimization",
      "SEO Strategy"
    ]
  },
  {
    icon: <FiGlobe />,
    title: "Social Media",
    description: "Engaging social media content that builds your brand.",
    features: [
      "Social Media Posts",
      "Content Calendars",
      "Community Management",
      "Social Strategy"
    ]
  },
  {
    icon: <FiImage />,
    title: "Email Marketing",
    description: "Strategic email campaigns that nurture leads and drive sales.",
    features: [
      "Newsletter Writing",
      "Email Sequences",
      "Campaign Strategy",
      "Performance Analysis"
    ]
  },
  {
    icon: <FiLayers />,
    title: "Content Strategy",
    description: "Comprehensive content strategies aligned with your goals.",
    features: [
      "Content Audits",
      "Strategy Development",
      "Content Calendar",
      "Performance Tracking"
    ]
  }
];

const Services = () => {
  return (
    <PageContainer>
      <HeaderSection>
        <HeaderContent
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Our Services</Title>
          <Subtitle>
            We offer a comprehensive suite of content services to help your business
            grow and engage with your audience effectively.
          </Subtitle>
        </HeaderContent>
      </HeaderSection>

      <DetailedSection data-alternate="true">
        <SectionContent>
          <ServiceGrid>
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceFeatures>
                  {service.features.map((feature) => (
                    <ServiceFeature key={feature}>{feature}</ServiceFeature>
                  ))}
                </ServiceFeatures>
              </ServiceCard>
            ))}
          </ServiceGrid>
        </SectionContent>
      </DetailedSection>

      <ServicesSection />
    </PageContainer>
  );
};

export default Services;