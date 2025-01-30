import React from 'react';
import { FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';
import {
  Section,
  Container,
  Content,
  Title,
  Description,
  Stats,
  StatItem,
  StatIcon,
  StatNumber,
  StatLabel,
  ImageWrapper,
  Image
} from './AboutSection.styled';

const stats = [
  {
    icon: <FiUsers />,
    number: '10K+',
    label: 'Active Users',
  },
  {
    icon: <FiAward />,
    number: '50+',
    label: 'Awards Won',
  },
  {
    icon: <FiTrendingUp />,
    number: '99%',
    label: 'Success Rate',
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const AboutSection = () => {
  return (
    <Section>
      <Container>
        <Content>
          <Title
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Empowering Your <span>Digital</span> Content Journey
          </Title>
          <Description
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            We're passionate about helping businesses and creators manage their content
            effectively. Our platform combines powerful features with intuitive design
            to make content management a breeze.
          </Description>
          <Stats
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <StatItem key={index} variants={itemVariants}>
                <StatIcon>{stat.icon}</StatIcon>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </Stats>
        </Content>
        <ImageWrapper
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image src="/images/about-illustration.svg" alt="About Us" />
        </ImageWrapper>
      </Container>
    </Section>
  );
};

export default AboutSection;
