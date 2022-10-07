import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';

const store = configureStore({
  reducer: { authData:auth},
});

export default store;