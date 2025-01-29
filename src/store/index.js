import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contentReducer from './slices/contentSlice';
import serviceReducer from './slices/serviceSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['content', 'service'],
};

const contentPersistedReducer = persistReducer(persistConfig, contentReducer);
const servicePersistedReducer = persistReducer(persistConfig, serviceReducer);

export const store = configureStore({
  reducer: {
    content: contentPersistedReducer,
    service: servicePersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);
