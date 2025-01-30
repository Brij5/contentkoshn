import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contentAPI } from '../../services/api';
import { toast } from 'react-toastify';

// Async thunks
export const fetchContents = createAsyncThunk(
  'content/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await contentAPI.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchContentById = createAsyncThunk(
  'content/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await contentAPI.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createContent = createAsyncThunk(
  'content/create',
  async (contentData, { rejectWithValue }) => {
    try {
      const response = await contentAPI.create(contentData);
      toast.success('Content created successfully');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateContent = createAsyncThunk(
  'content/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await contentAPI.update(id, data);
      toast.success('Content updated successfully');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContent = createAsyncThunk(
  'content/delete',
  async (id, { rejectWithValue }) => {
    try {
      await contentAPI.delete(id);
      toast.success('Content deleted successfully');
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchContents = createAsyncThunk(
  'content/search',
  async (query, { rejectWithValue }) => {
    try {
      const response = await contentAPI.search(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const publishContent = createAsyncThunk(
  'content/publish',
  async (id, { rejectWithValue }) => {
    try {
      const response = await contentAPI.update(id, { status: 'published' });
      toast.success('Content published successfully');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unpublishContent = createAsyncThunk(
  'content/unpublish',
  async (id, { rejectWithValue }) => {
    try {
      const response = await contentAPI.update(id, { status: 'draft' });
      toast.success('Content unpublished successfully');
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
    status: 'all',
    search: '',
    tags: [],
    dateRange: null,
    author: null
  },
  stats: {
    published: 0,
    draft: 0,
    scheduled: 0,
    total: 0
  }
};

const contentSlice = createSlice({
  name: 'content',
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
    },
    updateStats: (state) => {
      state.stats = {
        published: state.items.filter(item => item.status === 'published').length,
        draft: state.items.filter(item => item.status === 'draft').length,
        scheduled: state.items.filter(item => item.status === 'scheduled').length,
        total: state.items.length
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all contents
      .addCase(fetchContents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.contents;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalContents,
          pageSize: action.payload.pageSize || 10
        };
        state.stats = action.payload.stats || {
          published: state.items.filter(item => item.status === 'published').length,
          draft: state.items.filter(item => item.status === 'draft').length,
          scheduled: state.items.filter(item => item.status === 'scheduled').length,
          total: state.items.length
        };
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch content by ID
      .addCase(fetchContentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchContentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create content
      .addCase(createContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContent.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.pagination.totalItems += 1;
        state.stats[action.payload.status] += 1;
        state.stats.total += 1;
      })
      .addCase(createContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update content
      .addCase(updateContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          const oldStatus = state.items[index].status;
          state.items[index] = action.payload;
          if (oldStatus !== action.payload.status) {
            state.stats[oldStatus] -= 1;
            state.stats[action.payload.status] += 1;
          }
        }
        if (state.currentItem?._id === action.payload._id) {
          state.currentItem = action.payload;
        }
      })
      .addCase(updateContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete content
      .addCase(deleteContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContent.fulfilled, (state, action) => {
        state.loading = false;
        const deletedItem = state.items.find(item => item._id === action.payload);
        if (deletedItem) {
          state.stats[deletedItem.status] -= 1;
          state.stats.total -= 1;
        }
        state.items = state.items.filter(item => item._id !== action.payload);
        state.pagination.totalItems -= 1;
        if (state.currentItem?._id === action.payload) {
          state.currentItem = null;
        }
      })
      .addCase(deleteContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search contents
      .addCase(searchContents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchContents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.contents;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalContents,
          pageSize: action.payload.pageSize || 10
        };
      })
      .addCase(searchContents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Publish content
      .addCase(publishContent.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          const oldStatus = state.items[index].status;
          state.items[index] = action.payload;
          state.stats[oldStatus] -= 1;
          state.stats.published += 1;
        }
        if (state.currentItem?._id === action.payload._id) {
          state.currentItem = action.payload;
        }
      })
      // Unpublish content
      .addCase(unpublishContent.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
          state.stats.published -= 1;
          state.stats.draft += 1;
        }
        if (state.currentItem?._id === action.payload._id) {
          state.currentItem = action.payload;
        }
      });
  }
});

export const { setFilters, clearFilters, clearError, clearCurrentItem, updateStats } = contentSlice.actions;

// Selectors
export const selectAllContents = (state) => state.content.items;
export const selectCurrentContent = (state) => state.content.currentItem;
export const selectContentLoading = (state) => state.content.loading;
export const selectContentError = (state) => state.content.error;
export const selectContentPagination = (state) => state.content.pagination;
export const selectContentFilters = (state) => state.content.filters;
export const selectContentStats = (state) => state.content.stats;

export default contentSlice.reducer; 