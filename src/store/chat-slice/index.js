import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
};

export const getUser = createAsyncThunk("/auth/resetPassword",
    async(formData, { rejectWithValue }) => {
        try{
            const response = await axios.get("http://localhost:3000/api/v1/users/userResetPassword", formData, {
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

export const getMessages = createAsyncThunk("/auth/resetPassword",
    async(formData, { rejectWithValue }) => {
        try{
            const response = await axios.get("http://localhost:3000/api/v1/users/userResetPassword", formData, {
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

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducer:{
        setChat: (state, action) => {}
    },
    extraReducers: (builder) => {

    }
})

export default chatSlice.reducer;