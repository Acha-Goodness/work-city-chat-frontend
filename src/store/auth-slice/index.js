import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:3000"

const initialState = {
    isAuthenticated : false,
    isLoading : true,
    user : null,
    error: null,
    onlineUsers: [],
    socket: null
};


export const registerUser = createAsyncThunk("/auth/register",
    async(formData, { rejectWithValue }) => {
        try{
            const response = await axios.post("http://localhost:3000/api/v1/users/userSignUp", formData, {
                withCredentials : true
            });
            return response.data;
        }catch (err) {
            const message =
            err.response?.data?.message || "Something went wrong during registration";
            return rejectWithValue(message);
        }
    }
);

export const verifyOtp = createAsyncThunk("/auth/verifyOtp",
    async(otp, { rejectWithValue }) => {
        try{
            const response = await axios.post("http://localhost:3000/api/v1/users/userVerifyOTP", {otp}, {
                withCredentials : true
            });
            return response.data;
        }catch (err) {
            const message =
            err.response?.data?.message || "Something went wrong during registration";
            return rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk("/auth/login",
    async(formData, { rejectWithValue }) => {
        try{
            const response = await axios.post("http://localhost:3000/api/v1/users/userLogin", formData, {
                withCredentials : true
            });
            return response.data
        }catch (err) {
            const message =
            err.response?.data?.message || "Something went wrong during login";
            return rejectWithValue(message);
        }
    }
);

export const forgotPassword = createAsyncThunk("/auth/forgotPassword",
    async(formData, { rejectWithValue }) => {
        try{
            const response = await axios.post("http://localhost:3000/api/v1/users/userForgotPassword", formData, {
                withCredentials : true
            });
            return response.data
        }catch (err) {
            const message =
            err.response?.data?.message || "Something went wrong";
            return rejectWithValue(message);
        }
    }
);

export const resetPassword = createAsyncThunk("/auth/resetPassword",
    async(formData, { rejectWithValue }) => {
        try{
            const response = await axios.post("http://localhost:3000/api/v1/users/userResetPassword", formData, {
                withCredentials : true
            });
            return response.data
        }catch (err) {
            const message =
            err.response?.data?.message || "Something went wrong";
            return rejectWithValue(message);
        }
    }
);

export const checkAuth = createAsyncThunk("/auth/checkauth",
    async(_, { rejectWithValue }) => {
        try{
            const response = await axios.get("http://localhost:3000/api/v1/users/check-auth", {
                withCredentials : true,
                headers : {
                    "Cache-Control" : "no-store, no-cache, must-revalidate, proxy-revalidate",
                    // Expires : "0"
                }
            });
            return response.data
        }catch (err) {
            const message =
            err.response?.data?.message || "Something went wrong";
            return rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk("/auth/logout",
    async(rejectWithValue) => {
        try{
            const response = await axios.post("http://localhost:3000/api/v1/users/logout",{}, {
                withCredentials : true
            });
            return response.data
        }catch (err) {
            const message =
            err.response?.data?.message || "Something went wrong during logout";
            return rejectWithValue(message);
        }
    }
);

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setSocket: (state, action) => {
          state.socket = action.payload;
        },

        setOnlineUsers: (state, action) => {
          state.onlineUsers = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
            state.isAuthenticated = false;
        }).addCase(verifyOtp.pending, (state) => {
            state.isLoading = true;
        }).addCase(verifyOtp.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        }).addCase(verifyOtp.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
            state.isAuthenticated = false;
        }).addCase(login.pending, (state) => {
            state.isLoading = true;
        }).addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        }).addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
            state.isAuthenticated = false;
        }).addCase(forgotPassword.pending, (state) => {
            state.isLoading = true;
        }).addCase(forgotPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload; 
            state.isAuthenticated = false;
        }).addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
            state.isAuthenticated = false;
        }).addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
        }).addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        }).addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
            state.isAuthenticated = false;
        }).addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = action.payload.status;
        }).addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
            state.isAuthenticated = false;
        }).addCase(logout.fulfilled, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
    }
})

export const { setOnlineUsers, setSocket, clearSocket } = authSlice.actions;
export default authSlice.reducer;

export const connectSocket = createAsyncThunk(
  "auth/connectSocket",
  async (_, { getState, dispatch }) => {
    const state = getState().auth;

    const socket = io(BASE_URL, {   
      withCredentials: true,
      query: { userId: state.user?.user._id }
    });

    socket.on("getOnlineUsers", (userIds) => {
      dispatch(setOnlineUsers(userIds));
    });

    dispatch(setSocket(socket));

     return socket;
  }
);

export const disconnectSocket = createAsyncThunk(
  "auth/disconnectSocket",
  async (_, { getState, dispatch }) => {
    const state = getState().auth;
    if (state.socket) {
      state.socket.disconnect();
      dispatch(setSocket(null));
    }
  }
);