import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/booksSlice';
import authReducer from '../features/authSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer,
  },
});

export default store;
