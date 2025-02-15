import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: string | null;
    token: string | null;
    isAuthenticated: boolean;
}

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState: AuthState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    isAuthenticated: !!storedToken,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        register: (state, action: PayloadAction<{ user: string; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(state.user));
            localStorage.setItem("token", state.token);
        },
        login: (state, action: PayloadAction<{ user: string; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(state.user));
            localStorage.setItem("token", state.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
        profileUpdate: (state, action: PayloadAction<{ user: string }>) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(state.user));
        }
    }
});

export const { login, register, logout, profileUpdate } = authSlice.actions;
export default authSlice.reducer;
