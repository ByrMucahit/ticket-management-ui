import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/travelSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Örnek bir slice
  },
});

// RootState ve AppDispatch tiplerini otomatik olarak oluştur
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;