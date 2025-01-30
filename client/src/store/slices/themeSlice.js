import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light', // light, dark, system
  primaryColor: '#1976d2',
  fontSize: 'medium', // small, medium, large
  spacing: 'normal', // compact, normal, comfortable
  borderRadius: 4,
  animations: true,
  customTheme: null,
  systemPreference: null
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.mode = action.payload;
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setSpacing: (state, action) => {
      state.spacing = action.payload;
    },
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload;
    },
    toggleAnimations: (state) => {
      state.animations = !state.animations;
    },
    setCustomTheme: (state, action) => {
      state.customTheme = action.payload;
    },
    setSystemPreference: (state, action) => {
      state.systemPreference = action.payload;
      if (state.mode === 'system') {
        state.mode = action.payload === 'dark' ? 'dark' : 'light';
      }
    },
    resetTheme: () => initialState
  }
});

// Selectors
export const selectTheme = (state) => {
  const { mode, systemPreference, ...rest } = state.theme;
  return {
    ...rest,
    mode: mode === 'system' ? systemPreference || 'light' : mode,
    isSystemMode: mode === 'system'
  };
};

export const selectThemeMode = (state) => {
  const { mode, systemPreference } = state.theme;
  return mode === 'system' ? systemPreference || 'light' : mode;
};

export const {
  setThemeMode,
  setPrimaryColor,
  setFontSize,
  setSpacing,
  setBorderRadius,
  toggleAnimations,
  setCustomTheme,
  setSystemPreference,
  resetTheme
} = themeSlice.actions;

export default themeSlice.reducer;