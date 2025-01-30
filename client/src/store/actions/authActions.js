import { login, logout, setError, setLoading, clearError } from '../slices/authSlice';
import { userApi } from '../../services/apiService';

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await userApi.register(userData);
    dispatch(login(response.data));
    return true;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Registration failed'));
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await userApi.login(credentials);
    dispatch(login(response.data));
    return true;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Login failed'));
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await userApi.logout();
    dispatch(logout());
    return true;
  } catch (error) {
    dispatch(setError('Logout failed'));
    return false;
  }
};

export { clearError };