import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { foodieLoveApi } from "./service/foodieService";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [foodieLoveApi.reducerPath]: foodieLoveApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(foodieLoveApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
