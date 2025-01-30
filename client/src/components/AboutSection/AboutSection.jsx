import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiTarget, FiUsers, FiAward } from 'react-icons/fi';

const Section = styled.section`
  padding: 6rem 2rem;
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const TextContent = styled.div`
  @media (max-width: 968px) {
    order: 2;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const Description = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 968px) {
    justify-items: center;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ color }) => `${color}15`};
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.875rem;
`;

const ImageContent = styled(motion.div)`
  position: relative;

  img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 968px) {
    order: 1;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const stats = [
  {
    icon: <FiUsers />,
    number: '10K+',
    label: 'Active Users',
    color: '#2196F3'
  },
  {
    icon: <FiTarget />,
    number: '95%',
    label: 'Success Rate',
    color: '#4CAF50'
  },
  {
    icon: <FiAward />,
    number: '15+',
    label: 'Years Experience',
    color: '#FFC107'
  }
];

const AboutSection = () => {
  return (
    <Section>
      <Container>
        <Content>
          <TextContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Title>Transforming Content Management for Modern Businesses</Title>
              <Description>
                At ContentKosh, we believe in making content management simple, efficient, and 
                effective. Our platform is designed to help businesses of all sizes streamline 
                their content operations and achieve better results.
              </Description>
              <Description>
                With over 15 years of experience in the industry, we've helped thousands of 
                businesses transform their content strategy and achieve their goals.
              </Description>
            </motion.div>
            <Stats>
              {stats.map((stat, index) => (
                <StatItem
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <StatIcon color={stat.color}>{stat.icon}</StatIcon>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatItem>
              ))}
            </Stats>
          </TextContent>
          <ImageContent
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src="/images/about-illustration.svg" alt="About ContentKosh" />
          </ImageContent>
        </Content>
      </Container>
    </Section>
  );
};

AboutSection.propTypes = {
  teamMembers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ),
  theme: PropTypes.object.isRequired
};

export default AboutSection;
