import { configureStore } from "@reduxjs/toolkit";
import { createReducerManager, staticReducers } from "./reducerManager";

// Helper to restore auth state from localStorage
const loadAuthState = () => {
  try {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token && userStr) {
      const user = JSON.parse(userStr);
      return {
        auth: {
          main: {
            user,
            isAuthenticated: true,
            restoring: false,
          }
        },
      };
    }
  } catch (e) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
  return undefined;
};

const preloadedState = loadAuthState();
const reducerManager = createReducerManager(staticReducers);

export const store = configureStore({
  reducer: reducerManager.reduce,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.reducerManager = reducerManager;
