import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  loading: {
    global: false,
    components: {}
  },
  sidebarOpen: false,
  sidebarWidth: 240,
  toasts: [],
  modal: {
    isOpen: false,
    type: null,
    props: null,
    size: 'md',
    fullScreen: false
  },
  notifications: {
    items: [],
    unreadCount: 0,
    isOpen: false
  },
  layout: {
    headerHeight: 64,
    footerHeight: 48,
    contentPadding: 24,
    breakpoint: 'lg'
  },
  preferences: {
    animations: true,
    sounds: true,
    notifications: true,
    compactMode: false,
    autoSave: true,
    language: 'en'
  },
  contextMenu: {
    isOpen: false,
    x: 0,
    y: 0,
    items: []
  },
  tour: {
    isActive: false,
    currentStep: 0,
    steps: []
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    setComponentLoading: (state, action) => {
      state.loading.components[action.payload.component] = action.payload.isLoading;
    },
    clearComponentLoading: (state, action) => {
      delete state.loading.components[action.payload];
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setSidebarWidth: (state, action) => {
      state.sidebarWidth = action.payload;
    },
    addToast: (state, action) => {
      const toast = {
        id: Date.now(),
        type: 'info',
        duration: 5000,
        ...action.payload
      };
      state.toasts.push(toast);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
    openModal: (state, action) => {
      state.modal = {
        isOpen: true,
        type: action.payload.type,
        props: action.payload.props,
        size: action.payload.size || 'md',
        fullScreen: action.payload.fullScreen || false
      };
    },
    closeModal: (state) => {
      state.modal = {
        ...initialState.modal
      };
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        read: false,
        timestamp: new Date().toISOString(),
        ...action.payload
      };
      state.notifications.items.unshift(notification);
      state.notifications.unreadCount += 1;
    },
    removeNotification: (state, action) => {
      const notification = state.notifications.items.find(item => item.id === action.payload);
      if (notification && !notification.read) {
        state.notifications.unreadCount -= 1;
      }
      state.notifications.items = state.notifications.items.filter(item => item.id !== action.payload);
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.items.find(item => item.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.notifications.unreadCount -= 1;
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.items.forEach(notification => {
        notification.read = true;
      });
      state.notifications.unreadCount = 0;
    },
    toggleNotifications: (state) => {
      state.notifications.isOpen = !state.notifications.isOpen;
    },
    setLayout: (state, action) => {
      state.layout = {
        ...state.layout,
        ...action.payload
      };
    },
    updatePreferences: (state, action) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload
      };
    },
    resetPreferences: (state) => {
      state.preferences = initialState.preferences;
    },
    openContextMenu: (state, action) => {
      state.contextMenu = {
        isOpen: true,
        x: action.payload.x,
        y: action.payload.y,
        items: action.payload.items
      };
    },
    closeContextMenu: (state) => {
      state.contextMenu = initialState.contextMenu;
    },
    startTour: (state, action) => {
      state.tour = {
        isActive: true,
        currentStep: 0,
        steps: action.payload.steps
      };
    },
    nextTourStep: (state) => {
      if (state.tour.currentStep < state.tour.steps.length - 1) {
        state.tour.currentStep += 1;
      } else {
        state.tour = initialState.tour;
      }
    },
    previousTourStep: (state) => {
      if (state.tour.currentStep > 0) {
        state.tour.currentStep -= 1;
      }
    },
    endTour: (state) => {
      state.tour = initialState.tour;
    }
  }
});

export const {
  toggleTheme,
  setTheme,
  setGlobalLoading,
  setComponentLoading,
  clearComponentLoading,
  toggleSidebar,
  setSidebarOpen,
  setSidebarWidth,
  addToast,
  removeToast,
  clearToasts,
  openModal,
  closeModal,
  addNotification,
  removeNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  toggleNotifications,
  setLayout,
  updatePreferences,
  resetPreferences,
  openContextMenu,
  closeContextMenu,
  startTour,
  nextTourStep,
  previousTourStep,
  endTour
} = uiSlice.actions;

// Selectors
export const selectTheme = (state) => state.ui.theme;
export const selectGlobalLoading = (state) => state.ui.loading.global;
export const selectComponentLoading = (componentId) => (state) => 
  state.ui.loading.components[componentId] || false;
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectSidebarWidth = (state) => state.ui.sidebarWidth;
export const selectToasts = (state) => state.ui.toasts;
export const selectModal = (state) => state.ui.modal;
export const selectNotifications = (state) => state.ui.notifications;
export const selectUnreadNotificationsCount = (state) => state.ui.notifications.unreadCount;
export const selectLayout = (state) => state.ui.layout;
export const selectPreferences = (state) => state.ui.preferences;
export const selectContextMenu = (state) => state.ui.contextMenu;
export const selectTour = (state) => state.ui.tour;

export default uiSlice.reducer;