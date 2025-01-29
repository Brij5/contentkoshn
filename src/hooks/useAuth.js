import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  selectIsAuthenticated,
  selectUser,
  selectToken,
  selectAuthLoading,
  selectAuthError
} from '../store/slices/authSlice';
import useApi from './useApi';
import useToast from './useToast';
import * as authService from '../services/authService';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const login = useApi(authService.login, {
    onSuccess: (data) => {
      dispatch(loginSuccess(data));
      toast.success('Welcome back!');
      navigate('/dashboard');
    },
    onError: (error) => {
      dispatch(loginFailure(error.message));
    }
  });

  const register = useApi(authService.register, {
    onSuccess: () => {
      toast.success('Registration successful! Please verify your email.');
      navigate('/login');
    }
  });

  const verifyEmail = useApi(authService.verifyEmail, {
    onSuccess: () => {
      toast.success('Email verified successfully! You can now log in.');
      navigate('/login');
    }
  });

  const forgotPassword = useApi(authService.forgotPassword, {
    onSuccess: () => {
      toast.success('Password reset instructions have been sent to your email.');
      navigate('/login');
    }
  });

  const resetPassword = useApi(authService.resetPassword, {
    onSuccess: () => {
      toast.success('Password has been reset successfully! You can now log in.');
      navigate('/login');
    }
  });

  const updateProfile = useApi(authService.updateProfile, {
    onSuccess: (data) => {
      dispatch(updateUser(data));
      toast.success('Profile updated successfully!');
    }
  });

  const changePassword = useApi(authService.changePassword, {
    onSuccess: () => {
      toast.success('Password changed successfully!');
    }
  });

  const logoutUser = useCallback(() => {
    dispatch(logout());
    toast.success('You have been logged out successfully.');
    navigate('/login');
  }, [dispatch, navigate, toast]);

  const checkAuth = useCallback(() => {
    if (!token) {
      dispatch(logout());
      return false;
    }
    return true;
  }, [dispatch, token]);

  return {
    isAuthenticated,
    user,
    token,
    loading,
    error,
    login: login.execute,
    register: register.execute,
    verifyEmail: verifyEmail.execute,
    forgotPassword: forgotPassword.execute,
    resetPassword: resetPassword.execute,
    updateProfile: updateProfile.execute,
    changePassword: changePassword.execute,
    logout: logoutUser,
    checkAuth
  };
};

export default useAuth; 