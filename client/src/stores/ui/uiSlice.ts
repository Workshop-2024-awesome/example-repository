import { createSlice } from "@reduxjs/toolkit";

export enum BOOT_STATE {
  INIT = "INIT",
  READY = "READY",
  ERROR = "ERROR",
}

interface IBootState {
  isAuthenticated: boolean;
  bootState: BOOT_STATE;
}

const initialState: IBootState = {
  isAuthenticated: false,
  bootState: BOOT_STATE.INIT,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    startAppInitialization: (state) => {
      state.bootState = BOOT_STATE.INIT;
    },
    finishAppInitialization: (state) => {
      state.bootState = BOOT_STATE.READY;
    },
    appInitializationFailed: (state) => {
      state.bootState = BOOT_STATE.ERROR;
    },
  },
});

export const {
  startAppInitialization,
  finishAppInitialization,
  appInitializationFailed,
} = uiSlice.actions;
