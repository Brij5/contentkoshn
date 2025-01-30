import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const Section = styled.section`
  padding: 6rem 2rem;
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  @media (max-width: 968px) {
    order: 2;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #2196F315;
  color: #2196F3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const InfoText = styled.div`
  color: #666;
  font-size: 1rem;
  line-height: 1.4;

  strong {
    display: block;
    color: #333;
    margin-bottom: 0.25rem;
  }
`;

const FormContainer = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 968px) {
    order: 1;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #eee;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2196F3;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #eee;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2196F3;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background: #1976D2;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  return (
    <Section id="contact">
      <Container>
        <Grid>
          <ContactInfo>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Title>Get in Touch</Title>
              <Description>
                Have questions about our platform? Want to learn more about how we can help
                your business? Reach out to us, and we'll get back to you shortly.
              </Description>
              <InfoList>
                <InfoItem>
                  <IconWrapper>
                    <FiMail />
                  </IconWrapper>
                  <InfoText>
                    <strong>Email Us</strong>
                    contact@contentkosh.com
                  </InfoText>
                </InfoItem>
                <InfoItem>
                  <IconWrapper>
                    <FiPhone />
                  </IconWrapper>
                  <InfoText>
                    <strong>Call Us</strong>
                    +1 (555) 123-4567
                  </InfoText>
                </InfoItem>
                <InfoItem>
                  <IconWrapper>
                    <FiMapPin />
                  </IconWrapper>
                  <InfoText>
                    <strong>Visit Us</strong>
                    123 Business Street, Suite 100<br />
                    San Francisco, CA 94111
                  </InfoText>
                </InfoItem>
              </InfoList>
            </motion.div>
          </ContactInfo>

          <FormContainer
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Subject</Label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Message</Label>
                <TextArea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <FiSend />
              </SubmitButton>
            </Form>
          </FormContainer>
        </Grid>
      </Container>
    </Section>
  );
};

export default ContactSection;
