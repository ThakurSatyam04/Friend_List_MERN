import { configureStore } from '@reduxjs/toolkit'
import { TeamSlice } from './Slices/TeamSlice.js';

export const store = configureStore({
  reducer: {
    team : TeamSlice.reducer
  }
});