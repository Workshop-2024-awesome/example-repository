import { ListenerMiddlewareInstance } from "@reduxjs/toolkit";
import { setIsAuthenticated } from "../auth/authSlice";
import { AppDispatch, RootState } from "../store";
import {
  startAppInitialization,
  finishAppInitialization,
  appInitializationFailed,
} from "./uiSlice";
import { printError } from "../../helper/printError";

export function initializeUiListenerMiddleware(
  listenerMiddleware: ListenerMiddlewareInstance
) {
  listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
    actionCreator: startAppInitialization,
    effect: async (_action, listenerApi) => {
      try {
        const sessionKey = localStorage.getItem("accessToken");
        if (sessionKey != null) {
          listenerApi.dispatch(setIsAuthenticated(true));
        } else {
          listenerApi.dispatch(setIsAuthenticated(false));
        }
        listenerApi.dispatch(finishAppInitialization());
      } catch (error) {
        listenerApi.dispatch(appInitializationFailed());
        printError(error);
      }
    },
  });
}
