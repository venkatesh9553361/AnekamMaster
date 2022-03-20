import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./services/auth";
import authReducer from "./state/authSlice";

const currentUser = sessionStorage.getItem("CurrentUser")
  ? JSON.parse(sessionStorage.getItem("CurrentUser"))
  : [];
const success = sessionStorage.getItem("Success")
  ? JSON.parse(sessionStorage.getItem("Success"))
  : "";
const initialState = {
  auth: {
    currentUser: currentUser,
    success: success,
  },
};
export const store = configureStore({
  // reducerPath and reducer are created for us, which we can pass straight into the reducer parameter of configureStore.
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  preloadedState: initialState,

  // middleware is also created for us, which will allow us to take advantage of caching, invalidation, polling, and the other features of RTK Query.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// It will enable to refetch the data on certain events, such as refetchOnFocus and refetchOnReconnect.
setupListeners(store.dispatch);
