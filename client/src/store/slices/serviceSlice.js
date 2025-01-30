import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { servicesAPI } from '../../services/api';
import { toast } from 'react-toastify';

// Async thunks
export const fetchServices = createAsyncThunk(
  'services/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await servicesAPI.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  'services/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await servicesAPI.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createService = createAsyncThunk(
  'services/create',
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await servicesAPI.create(serviceData);
      toast.success('Service created successfully');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateService = createAsyncThunk(
  'services/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await servicesAPI.update(id, data);
      toast.success('Service updated successfully');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteService = createAsyncThunk(
  'services/delete',
  async (id, { rejectWithValue }) => {
    try {
      await servicesAPI.delete(id);
      toast.success('Service deleted successfully');
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchServices = createAsyncThunk(
  'services/search',
  async (query, { rejectWithValue }) => {
    try {
      const response = await servicesAPI.search(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  currentItem: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 10
  },
  filters: {
    category: null,
    status: 'active',
    search: ''
  }
};

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentItem: (state) => {
      state.currentItem = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.services;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalServices,
          pageSize: action.payload.pageSize || 10
        };
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch service by ID
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create service
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.pagination.totalItems += 1;
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update service
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentItem?._id === action.payload._id) {
          state.currentItem = action.payload;
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete service
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item._id !== action.payload);
        state.pagination.totalItems -= 1;
        if (state.currentItem?._id === action.payload) {
          state.currentItem = null;
        }
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search services
      .addCase(searchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.services;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalServices,
          pageSize: action.payload.pageSize || 10
        };
      })
      .addCase(searchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, clearFilters, clearError, clearCurrentItem } = serviceSlice.actions;

// Selectors
export const selectAllServices = (state) => state.services.items;
export const selectCurrentService = (state) => state.services.currentItem;
export const selectServicesLoading = (state) => state.services.loading;
export const selectServicesError = (state) => state.services.error;
export const selectServicesPagination = (state) => state.services.pagination;
export const selectServicesFilters = (state) => state.services.filters;

export default serviceSlice.reducer;