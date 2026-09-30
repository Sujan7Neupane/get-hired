import { createSlice } from "@reduxjs/toolkit";

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: "candidate" | "employer" | "admin";
  profileImage?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = { user: null, isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
