import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { resetPassword } from '../../services/authService';
import {
  Container,
  FormCard,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  LinkText,
  ErrorText,
  SuccessText
} from './Auth.styled';
import styled from 'styled-components';

const Requirements = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};

  li {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '✕';
      color: ${({ theme }) => theme.error};
    }

    &.valid::before {
      content: '✓';
      color: ${({ theme }) => theme.success};
    }
  }
`;

/**
 * @typedef {Object} FormData
 * @property {string} password
 * @property {string} confirmPassword
 */

/**
 * @typedef {Object} FormErrors
 * @property {string} [password]
 * @property {string} [confirmPassword]
 * @property {string} [general]
 */

/**
 * @typedef {Object} Validations
 * @property {boolean} length
 * @property {boolean} uppercase
 * @property {boolean} lowercase
 * @property {boolean} number
 * @property {boolean} special
 * @property {boolean} match
 */

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  /** @type {[FormData, React.Dispatch<React.SetStateAction<FormData>>]} */
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  /** @type {[FormErrors, React.Dispatch<React.SetStateAction<FormErrors>>]} */
  const [formErrors, setFormErrors] = useState({});

  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  const [success, setSuccess] = useState(false);

  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  const [isLoading, setIsLoading] = useState(false);

  /** @type {[Validations, React.Dispatch<React.SetStateAction<Validations>>]} */
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false
  });

  useEffect(() => {
    const { password, confirmPassword } = formData;
    setValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password),
      match: password && password === confirmPassword
    });
  }, [formData]);

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    /** @type {FormErrors} */
    const errors = {};
    const { password, confirmPassword } = formData;

    if (!password) {
      errors.password = 'Password is required';
    } else if (!Object.values(validations).every(Boolean)) {
      errors.password = 'Password does not meet all requirements';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  /**
   * @param {React.FormEvent} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword(token, formData.password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/auth/login');
      }, 3000);
    } catch (err) {
      setFormErrors({
        general: err.message || 'Failed to reset password. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Container>
        <FormCard>
          <SuccessText>
            Your password has been successfully reset.
            You will be redirected to the login page shortly.
          </SuccessText>
          <LinkText>
            <Link to="/auth/login">Click here to login now</Link>
          </LinkText>
        </FormCard>
      </Container>
    );
  }

  return (
    <Container>
      <FormCard>
        <Title>Reset Password</Title>
        <Form onSubmit={handleSubmit} noValidate>
          {formErrors.general && (
            <ErrorText role="alert">
              {formErrors.general}
            </ErrorText>
          )}

          <FormGroup>
            <Label htmlFor="password">New Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={!!formErrors.password}
              aria-describedby="password-requirements"
              autoComplete="new-password"
              required
            />
            <Requirements id="password-requirements">
              <li className={validations.length ? 'valid' : ''}>
                At least 8 characters long
              </li>
              <li className={validations.uppercase ? 'valid' : ''}>
                At least one uppercase letter
              </li>
              <li className={validations.lowercase ? 'valid' : ''}>
                At least one lowercase letter
              </li>
              <li className={validations.number ? 'valid' : ''}>
                At least one number
              </li>
              <li className={validations.special ? 'valid' : ''}>
                At least one special character (!@#$%^&*)
              </li>
              <li className={validations.match ? 'valid' : ''}>
                Passwords match
              </li>
            </Requirements>
            {formErrors.password && (
              <ErrorText role="alert">
                {formErrors.password}
              </ErrorText>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={!!formErrors.confirmPassword}
              autoComplete="new-password"
              required
            />
            {formErrors.confirmPassword && (
              <ErrorText role="alert">
                {formErrors.confirmPassword}
              </ErrorText>
            )}
          </FormGroup>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
          </Button>

          <LinkText>
            <Link to="/auth/login">Return to Login</Link>
          </LinkText>
        </Form>
      </FormCard>
    </Container>
  );
};

export default ResetPassword;