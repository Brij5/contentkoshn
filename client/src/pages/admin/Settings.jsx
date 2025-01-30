import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiSettings,
  FiMail,
  FiLock,
  FiGlobe,
  FiBell,
  FiUsers,
  FiSave,
  FiChevronRight
} from 'react-icons/fi';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import Dropdown from '../../components/shared/Dropdown';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  font-weight: 700;
`;

const SettingsLayout = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  height: fit-content;
`;

const NavItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  color: ${({ active }) => active ? '#2196F3' : '#333'};
  font-weight: ${({ active }) => active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: #f8f9fa;
  }

  svg:last-child {
    margin-left: auto;
    opacity: ${({ active }) => active ? 1 : 0};
  }
`;

const Content = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 2rem;
`;

const Section = styled.div`
  &:not(:last-child) {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #eee;
  }
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  color: #333;
  font-weight: 500;
`;

const Description = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 0.5rem;
  cursor: pointer;
`;

const SaveButton = styled(Button)`
  background: #2196F3;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: #1976D2;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Settings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'ContentKosh',
    siteDescription: 'A modern content management system',
    siteLanguage: 'en',
    emailNotifications: true,
    userRegistration: true,
    contentModeration: true,
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPassword: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Save settings:', settings);
  };

  const sections = [
    { id: 'general', icon: <FiSettings />, label: 'General' },
    { id: 'email', icon: <FiMail />, label: 'Email' },
    { id: 'notifications', icon: <FiBell />, label: 'Notifications' },
    { id: 'users', icon: <FiUsers />, label: 'Users' },
    { id: 'security', icon: <FiLock />, label: 'Security' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <>
            <Section>
              <SectionTitle>General Settings</SectionTitle>
              <FormGroup>
                <Label>Site Name</Label>
                <Input
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  placeholder="Enter site name"
                />
              </FormGroup>
              <FormGroup>
                <Label>Site Description</Label>
                <Input
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleChange}
                  placeholder="Enter site description"
                />
              </FormGroup>
              <FormGroup>
                <Label>Default Language</Label>
                <Dropdown
                  options={[
                    { label: 'English', value: 'en' },
                    { label: 'Spanish', value: 'es' },
                    { label: 'French', value: 'fr' }
                  ]}
                  value={settings.siteLanguage}
                  onChange={(value) => handleChange({ target: { name: 'siteLanguage', value } })}
                />
              </FormGroup>
            </Section>
          </>
        );
      case 'email':
        return (
          <>
            <Section>
              <SectionTitle>Email Settings</SectionTitle>
              <FormGroup>
                <Label>SMTP Host</Label>
                <Input
                  name="smtpHost"
                  value={settings.smtpHost}
                  onChange={handleChange}
                  placeholder="Enter SMTP host"
                />
              </FormGroup>
              <FormGroup>
                <Label>SMTP Port</Label>
                <Input
                  name="smtpPort"
                  value={settings.smtpPort}
                  onChange={handleChange}
                  placeholder="Enter SMTP port"
                />
              </FormGroup>
              <FormGroup>
                <Label>SMTP Username</Label>
                <Input
                  name="smtpUser"
                  value={settings.smtpUser}
                  onChange={handleChange}
                  placeholder="Enter SMTP username"
                />
              </FormGroup>
              <FormGroup>
                <Label>SMTP Password</Label>
                <Input
                  type="password"
                  name="smtpPassword"
                  value={settings.smtpPassword}
                  onChange={handleChange}
                  placeholder="Enter SMTP password"
                />
              </FormGroup>
            </Section>
          </>
        );
      case 'notifications':
        return (
          <>
            <Section>
              <SectionTitle>Notification Settings</SectionTitle>
              <FormGroup>
                <Label>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                  />
                  {' '}Enable Email Notifications
                </Label>
                <Description>
                  Send email notifications for important events
                </Description>
              </FormGroup>
            </Section>
          </>
        );
      case 'users':
        return (
          <>
            <Section>
              <SectionTitle>User Settings</SectionTitle>
              <FormGroup>
                <Label>
                  <input
                    type="checkbox"
                    name="userRegistration"
                    checked={settings.userRegistration}
                    onChange={handleChange}
                  />
                  {' '}Allow User Registration
                </Label>
                <Description>
                  Enable or disable new user registration
                </Description>
              </FormGroup>
              <FormGroup>
                <Label>
                  <input
                    type="checkbox"
                    name="contentModeration"
                    checked={settings.contentModeration}
                    onChange={handleChange}
                  />
                  {' '}Enable Content Moderation
                </Label>
                <Description>
                  Require approval for user-generated content
                </Description>
              </FormGroup>
            </Section>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Header>
        <Title>Settings</Title>
        <SaveButton onClick={handleSave}>
          <FiSave />
          Save Changes
        </SaveButton>
      </Header>

      <SettingsLayout>
        <Sidebar>
          {sections.map(section => (
            <NavItem
              key={section.id}
              active={activeSection === section.id}
              onClick={() => setActiveSection(section.id)}
            >
              {section.icon}
              {section.label}
              <FiChevronRight />
            </NavItem>
          ))}
        </Sidebar>

        <Content>
          {renderContent()}
        </Content>
      </SettingsLayout>
    </Container>
  );
};

export default Settings; 