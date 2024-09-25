import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import { api } from "../api/api";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authSlice } from "./auth/authSlice";
import { rtkQueryErrorLogger } from "./rtkQueryErrorLogger";
import { uiSlice } from "./ui/uiSlice";
import { initializeUiListenerMiddleware } from "./ui/uiListenerMiddleware";
import { initializeAuthListenerMiddleware } from "./auth/authListenerMiddleware";

export const listenerMiddleware = createListenerMiddleware();

initializeUiListenerMiddleware(listenerMiddleware);
initializeAuthListenerMiddleware(listenerMiddleware);

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [authSlice.reducerPath]: authSlice.reducer,
  [uiSlice.reducerPath]: uiSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(api.middleware, rtkQueryErrorLogger),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
