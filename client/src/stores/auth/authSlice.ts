import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  isAuthenticated: boolean;
}

const initialState: IAuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    signIn: (_state, _action: PayloadAction<{email: string, password: string}>) => {},
    signOut: _ => {},
  },
});

export const { setIsAuthenticated, signIn, signOut } = authSlice.actions;
