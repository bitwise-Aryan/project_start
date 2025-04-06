import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { userInfo } = action.payload;
            state.userInfo = userInfo;
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            const expirationTime = new Date().getTime() + 30 * 24 *60 * 60 * 1000; 
            localStorage.setItem("expirationTime", expirationTime);
        
        },
        logOut: (state) => {
            state.userInfo = null;
            localStorage.clear();
        },
    },
        
});
export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;