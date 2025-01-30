import React from 'react';
import { FiCheck } from 'react-icons/fi';
import {
  SectionContainer,
  SectionContent,
  SectionHeader,
  Title,
  Description,
  PricingGrid,
  PricingCard,
  PlanName,
  Price,
  FeaturesList,
  Feature,
  PricingButton
} from './PricingSection.styled';

const plans = [
  {
    name: 'Basic',
    price: '29',
    features: [
      'Up to 10 content pieces per month',
      'Basic SEO optimization',
      'Social media sharing',
      'Content analytics',
      'Email support'
    ]
  },
  {
    name: 'Professional',
    price: '79',
    popular: true,
    features: [
      'Up to 30 content pieces per month',
      'Advanced SEO optimization',
      'Social media strategy',
      'Detailed analytics & reports',
      'Priority email & chat support',
      'Content calendar',
      'Custom branding'
    ]
  },
  {
    name: 'Enterprise',
    price: '149',
    features: [
      'Unlimited content pieces',
      'Premium SEO optimization',
      'Complete social media management',
      'Advanced analytics & insights',
      '24/7 priority support',
      'Custom content strategy',
      'Dedicated account manager',
      'API access'
    ]
  }
];

const PricingSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <SectionContainer>
      <SectionContent>
        <SectionHeader>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Simple, Transparent <span>Pricing</span>
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose the perfect plan for your content management needs
          </Description>
        </SectionHeader>

        <PricingGrid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              variants={itemVariants}
              data-popular={plan.popular || false}
            >
              <PlanName>{plan.name}</PlanName>
              <Price>
                ${plan.price} <span>/ month</span>
              </Price>
              <FeaturesList>
                {plan.features.map((feature, index) => (
                  <Feature key={index}>
                    <FiCheck /> {feature}
                  </Feature>
                ))}
              </FeaturesList>
              <PricingButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-primary={plan.popular || false}
              >
                Get Started
              </PricingButton>
            </PricingCard>
          ))}
        </PricingGrid>
      </SectionContent>
    </SectionContainer>
  );
};

export default PricingSection;
