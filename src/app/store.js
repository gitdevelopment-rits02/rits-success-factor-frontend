import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './rootReducer';
import { injectStore } from "../api/axionInstance"

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

injectStore(store);
