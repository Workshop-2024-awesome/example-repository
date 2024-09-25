import { ListenerMiddlewareInstance } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { setIsAuthenticated, signIn, signOut } from "./authSlice";
import { api } from "../../api/api";
import { printError } from "../../helper/printError";

export function initializeAuthListenerMiddleware(
  listenerMiddleware: ListenerMiddlewareInstance
) {
  listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
    actionCreator: signIn,
    effect: async (action, listenerApi) => {
      try {
        const response = await listenerApi.dispatch(
          api.endpoints.authControllerSignIn.initiate({
            loginRequestDto: { email: action.payload.email, password: action.payload.password },
          })
        );
        if (response.error) {
          return;
        }
        localStorage.setItem("accessToken", response.data.token);
        listenerApi.dispatch(setIsAuthenticated(true));
      } catch (e) {
        printError(e);
      }
    },
  });

  listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
    actionCreator: signOut,
    effect: async (_action, listenerApi) => {
      try {
        await listenerApi.dispatch(
          api.endpoints.authControllerSignOut.initiate()
        );
        
        localStorage.clear();
        listenerApi.dispatch(setIsAuthenticated(false));
      } catch (e) {
        printError(e);
      }
    },
  });
}
