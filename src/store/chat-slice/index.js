import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
};



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