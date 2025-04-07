import { createSlice } from "@reduxjs/toolkit";

// Safely retrieve userInfo from localStorage
let userInfoFromStorage = null;

try {
  const stored = localStorage.getItem("userInfo");
  if (stored && stored !== "undefined") {
    userInfoFromStorage = JSON.parse(stored);
  }
} catch (error) {
  console.error("Failed to parse userInfo from localStorage:", error);
  localStorage.removeItem("userInfo"); // Clean up the bad value
}

const initialState = {
  userInfo: userInfoFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem("expirationTime", expirationTime);
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;