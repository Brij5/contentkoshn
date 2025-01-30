import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const Section = styled.section`
  padding: 6rem 2rem;
  background: #ffffff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const PriceCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 2px solid ${({ featured }) => (featured ? '#2196F3' : '#eee')};

  ${({ featured }) =>
    featured &&
    `
    &::before {
      content: 'Popular';
      position: absolute;
      top: 1rem;
      right: -2rem;
      background: #2196F3;
      color: white;
      padding: 0.25rem 3rem;
      transform: rotate(45deg);
      font-size: 0.875rem;
      font-weight: 500;
    }
  `}
`;

const PlanName = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Price = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #2196F3;
  margin-bottom: 1rem;

  span {
    font-size: 1rem;
    font-weight: 400;
    color: #666;
  }
`;

const Features = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  text-align: left;
  width: 100%;
`;

const Feature = styled.li`
  color: #666;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #4CAF50;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  border: none;
  background: ${({ featured }) => (featured ? '#2196F3' : 'transparent')};
  color: ${({ featured }) => (featured ? 'white' : '#2196F3')};
  border: 2px solid #2196F3;

  &:hover {
    background: #2196F3;
    color: white;
    transform: translateY(-2px);
  }
`;

const plans = [
  {
    name: 'Basic',
    price: '29',
    features: [
      '5 Team Members',
      '100 GB Storage',
      'Basic Analytics',
      'Email Support',
      'Basic Security'
    ]
  },
  {
    name: 'Professional',
    price: '99',
    featured: true,
    features: [
      'Unlimited Team Members',
      '1 TB Storage',
      'Advanced Analytics',
      'Priority Support',
      'Enhanced Security',
      'Custom Branding',
      'API Access'
    ]
  },
  {
    name: 'Enterprise',
    price: '299',
    features: [
      'Unlimited Everything',
      'Dedicated Support',
      'Custom Development',
      'SLA Agreement',
      'Advanced Security',
      'Custom Integration',
      'Training & Workshops'
    ]
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

const cardVariants = {
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

const PricingSection = () => {
  return (
    <Section>
      <Container>
        <Title>Simple, Transparent Pricing</Title>
        <Subtitle>
          Choose the perfect plan for your content management needs. No hidden fees.
        </Subtitle>
        <Grid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plans.map((plan, index) => (
            <PriceCard
              key={plan.name}
              variants={cardVariants}
              featured={plan.featured}
            >
              <PlanName>{plan.name}</PlanName>
              <Price>
                ${plan.price} <span>/ month</span>
              </Price>
              <Features>
                {plan.features.map((feature, i) => (
                  <Feature key={i}>
                    <FiCheck />
                    {feature}
                  </Feature>
                ))}
              </Features>
              <Button
                featured={plan.featured}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
              >
                Get Started
              </Button>
            </PriceCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default PricingSection;
