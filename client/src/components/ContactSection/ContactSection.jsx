import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import {
  Section,
  Container,
  Title,
  Description,
  Grid,
  ContactInfo,
  InfoItem,
  InfoContent,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  Button
} from './ContactSection.styled';

const formVariants = {
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

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <Section>
      <Container>
        <Title>Get in Touch</Title>
        <Description>
          Have questions? We'd love to hear from you. Send us a message and we'll respond
          as soon as possible.
        </Description>
        <Grid>
          <ContactInfo>
            <InfoItem>
              <FiMail />
              <InfoContent>
                <h3>Email</h3>
                <p>info@contentkosh.com</p>
              </InfoContent>
            </InfoItem>
            <InfoItem>
              <FiPhone />
              <InfoContent>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </InfoContent>
            </InfoItem>
            <InfoItem>
              <FiMapPin />
              <InfoContent>
                <h3>Address</h3>
                <p>123 Content Street<br />Digital City, DC 12345</p>
              </InfoContent>
            </InfoItem>
          </ContactInfo>
          <Form
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
          >
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <Button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message <FiSend />
            </Button>
          </Form>
        </Grid>
      </Container>
    </Section>
  );
};

export default ContactSection;
