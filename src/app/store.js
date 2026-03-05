// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from './rootReducer';
// import { injectStore } from "../api/axionInstance"

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// injectStore(store);
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

// --- Restore auth from localStorage BEFORE store creation ---
// This prevents the race condition where ProtectedRoute renders before
// useEffect can dispatch restoreAuth.
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
          },
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

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
