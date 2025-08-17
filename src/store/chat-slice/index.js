import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";


const { socket } = useSelector((state) => state.auth)

const initialState = {
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
};

export const getUsers = createAsyncThunk("/chat/getUsers",
    async(_,{ rejectWithValue }) => {
        try{
            const response = await axios.get(`http://localhost:3000/api/v1/msg/users`, {
                withCredentials : true
            });
            return response.data;
        }catch (err) {
            const message =
            err.response?.data?.message || "Something went wrong";
            return rejectWithValue(message);
        }
    }
);

export const getMessages = createAsyncThunk("/chat/getMessages",
    async(id, { rejectWithValue }) => {
        try{
            const response = await axios.get(`http://localhost:3000/api/v1/msg/${id}`, {
                withCredentials : true
            });
            return response.data;
        }catch (err) {
            const message =
            err.response?.data?.message || "Something went wrong";
            return rejectWithValue(message);
        }
    }
);

export const sendMessages = createAsyncThunk("/chat/sendMessages",
    async(messageData, {rejectWithValue, getState}) => {
        try{
            const state = getState();
            const { selectedUser } = state.chat;
            
            const response = await axios.post(`http://localhost:3000/api/v1/msg/send/${selectedUser._id}`, messageData, {
                withCredentials : true
            });
            return response.data;
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
    reducers:{
        setChat: (state, action) => {},

        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },

        subcribeToMessages: (state, action) => {
            if(!state.selectedUser) return;
            const sock = socket;

            sock.on("newMessage", (newMessage) => {
                state.messages = [...state.messages, newMessage]
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.isUsersLoading = true
        }).addCase(getUsers.fulfilled, (state, action) => {
            state.isUsersLoading = false,
            state.users = action.payload.users
        }).addCase(getUsers.rejected, (state) => {
            state.isUsersLoading = false,
            state.users = []
        }).addCase(getMessages.pending, (state) => {
            state.isMessagesLoading = true
        }).addCase(getMessages.fulfilled, (state, action) => {
            state.isMessagesLoading = false,
            state.messages = action.payload.data
        }).addCase(getMessages.rejected, (state) => {
            state.isMessagesLoading = false,
            state.messages = []
        })
    }
})

export const { setSelectedUser } = chatSlice.actions;
export default chatSlice.reducer;