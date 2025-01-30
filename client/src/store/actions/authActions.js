import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, clearError } from '../slices/authSlice';
import { userApi } from '../../services/apiService';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await userApi.register(userData);
      dispatch(login(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await userApi.login(credentials);
      dispatch(login(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await userApi.logout();
      dispatch(logout());
      return true;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

export { clearError };