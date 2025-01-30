import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services/authService';
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

/**
 * @typedef {Object} FormState
 * @property {string} email
 * @property {string} error
 * @property {boolean} success
 */

const ForgotPassword = () => {
  /** @type {[string, React.Dispatch<React.SetStateAction<string>>]} */
  const [email, setEmail] = useState('');
  /** @type {[string, React.Dispatch<React.SetStateAction<string>>]} */
  const [error, setError] = useState('');
  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  const [success, setSuccess] = useState(false);
  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  /**
   * @param {React.FormEvent} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      await forgotPassword(email);
      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError(err.message || 'Failed to send reset instructions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>Reset Password</Title>
        {success ? (
          <>
            <SuccessText>
              Password reset instructions have been sent to your email.
              Please check your inbox and spam folder.
            </SuccessText>
            <Button type="button" onClick={() => setSuccess(false)}>
              Send Another Reset Link
            </Button>
            <LinkText>
              <Link to="/auth/login">Return to Login</Link>
            </LinkText>
          </>
        ) : (
          <Form onSubmit={handleSubmit} noValidate>
            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                disabled={isLoading}
                aria-invalid={!!error}
                aria-describedby={error ? 'email-error' : undefined}
                placeholder="Enter your email address"
                autoComplete="email"
                required
              />
              {error && (
                <ErrorText id="email-error" role="alert">
                  {error}
                </ErrorText>
              )}
            </FormGroup>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending Instructions...' : 'Send Reset Instructions'}
            </Button>

            <LinkText>
              <Link to="/auth/login">Remember your password? Log in</Link>
            </LinkText>
          </Form>
        )}
      </FormCard>
    </Container>
  );
};

export default ForgotPassword;