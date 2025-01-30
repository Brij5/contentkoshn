import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiSave,
  FiGlobe,
  FiMail,
  FiLock,
  FiUsers,
  FiUpload,
  FiDatabase,
  FiSliders,
  FiToggleRight
} from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Section = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SectionIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Toggle = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
`;

const ToggleInput = styled.input`
  display: none;
  
  &:checked + span {
    background: ${({ theme }) => theme.colors.primary};
    
    &::before {
      transform: translateX(18px);
    }
  }
`;

const ToggleSlider = styled.span`
  position: relative;
  width: 36px;
  height: 20px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  transition: all 0.2s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    transition: all 0.2s ease;
  }
`;

const ToggleLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Settings = () => {
  const dispatch = useDispatch();
  const [settings, setSettings] = useState({
    siteName: 'ContentKosh',
    siteUrl: 'https://contentkosh.com',
    adminEmail: 'admin@contentkosh.com',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    enableRegistration: true,
    enableComments: true,
    enableNotifications: true,
    maintenanceMode: false,
    backupFrequency: 'daily',
    maxUploadSize: '10'
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Implement settings save functionality
    dispatch(addToast({
      type: 'success',
      message: 'Settings saved successfully'
    }));
  };

  const sections = [
    {
      title: 'General',
      icon: <FiGlobe size={18} />,
      settings: [
        {
          key: 'siteName',
          label: 'Site Name',
          type: 'text'
        },
        {
          key: 'siteUrl',
          label: 'Site URL',
          type: 'text'
        },
        {
          key: 'language',
          label: 'Language',
          type: 'select',
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Spanish' },
            { value: 'fr', label: 'French' }
          ]
        }
      ]
    },
    {
      title: 'Email',
      icon: <FiMail size={18} />,
      settings: [
        {
          key: 'adminEmail',
          label: 'Admin Email',
          type: 'email'
        },
        {
          key: 'enableNotifications',
          label: 'Enable Email Notifications',
          type: 'toggle'
        }
      ]
    },
    {
      title: 'Security',
      icon: <FiLock size={18} />,
      settings: [
        {
          key: 'enableRegistration',
          label: 'Enable User Registration',
          type: 'toggle'
        },
        {
          key: 'maintenanceMode',
          label: 'Maintenance Mode',
          type: 'toggle'
        }
      ]
    },
    {
      title: 'Content',
      icon: <FiSliders size={18} />,
      settings: [
        {
          key: 'enableComments',
          label: 'Enable Comments',
          type: 'toggle'
        },
        {
          key: 'maxUploadSize',
          label: 'Max Upload Size (MB)',
          type: 'text'
        }
      ]
    },
    {
      title: 'Backup',
      icon: <FiDatabase size={18} />,
      settings: [
        {
          key: 'backupFrequency',
          label: 'Backup Frequency',
          type: 'select',
          options: [
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' }
          ]
        }
      ]
    }
  ];

  return (
    <PageContainer>
      <Header>
        <Title>Settings</Title>
        <SaveButton onClick={handleSave}>
          <FiSave size={16} />
          Save Changes
        </SaveButton>
      </Header>

      <SettingsGrid>
        {sections.map((section, index) => (
          <Section
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SectionHeader>
              <SectionIcon>{section.icon}</SectionIcon>
              <SectionTitle>{section.title}</SectionTitle>
            </SectionHeader>

            {section.settings.map(setting => (
              <FormGroup key={setting.key}>
                <Label>{setting.label}</Label>
                {setting.type === 'toggle' ? (
                  <Toggle>
                    <ToggleInput
                      type="checkbox"
                      checked={settings[setting.key]}
                      onChange={(e) => handleChange(setting.key, e.target.checked)}
                    />
                    <ToggleSlider />
                    <ToggleLabel>
                      {settings[setting.key] ? 'Enabled' : 'Disabled'}
                    </ToggleLabel>
                  </Toggle>
                ) : setting.type === 'select' ? (
                  <Select
                    value={settings[setting.key]}
                    onChange={(e) => handleChange(setting.key, e.target.value)}
                  >
                    {setting.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                ) : (
                  <Input
                    type={setting.type}
                    value={settings[setting.key]}
                    onChange={(e) => handleChange(setting.key, e.target.value)}
                  />
                )}
              </FormGroup>
            ))}
          </Section>
        ))}
      </SettingsGrid>
    </PageContainer>
  );
};

export default Settings; 