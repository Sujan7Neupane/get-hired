import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: "candidate" | "employer" | "admin";
  profileImage?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
