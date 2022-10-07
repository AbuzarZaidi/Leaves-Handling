import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import applyForLeave from './applyForLeave';

const store = configureStore({
  reducer: { authData:auth,leave:applyForLeave},
});

export default store;