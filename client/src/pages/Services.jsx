import React from 'react';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import { FiEdit, FiLayout, FiImage, FiPieChart, FiLayers, FiGlobe } from 'react-icons/fi';
import {
  PageContainer,
  HeaderSection,
  HeaderContent,
  Title,
  Subtitle,
  DetailedSection,
  SectionContent,
  ServiceGrid,
  ServiceCard,
  ServiceIcon,
  ServiceTitle,
  ServiceDescription,
  ServiceFeatures,
  ServiceFeature
} from './Services.styled';

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