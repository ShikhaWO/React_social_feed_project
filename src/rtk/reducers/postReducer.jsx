import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance"

const initialState = {
    loader: false,
    posts: [],
    userPosts: [],
    error: "",
    feedImage: {}
};

export const getFeedPost = createAsyncThunk(
    "posts/get-feed-posts",
    async () => {
        try {
            const response = await axiosInstance.get("http://localhost:5000/posts/get-feed-posts");
            return response.data.data;
        } catch (err) {
            // return rejectWithValue(err.response.data);
        }
    }
);

export const createPost = createAsyncThunk(
    "posts/create-post",
    async (data, { rejectWithValue}) => {
        try {
            const response = await axiosInstance.post("http://localhost:5000/posts/create-post", data);
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getUserPost = createAsyncThunk(
    "posts/get-user-posts",
    async () => {
        try {
            const response = await axiosInstance.get("http://localhost:5000/posts/get-user-posts");
            return response.data.data;
        } catch (err) {
            // return rejectWithValue(err.response.data);
        }
    }
);

export const getFeedImage = createAsyncThunk(
    "posts/get-feed-image",
    async (postId, { rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`http://localhost:5000/posts/get-feed-image/${postId}`);
            console.log('response===',response)
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const PostReducer = createSlice({
    name: "post",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getFeedPost.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(getFeedPost.fulfilled, (state, action) => {
            state.loader = false;
            state.posts = action.payload?.data;
            state.error = "";
        });
        builder.addCase(getFeedPost.rejected, (state, action) => {
            state.loader = false;
            state.posts = [];
            state.error = action.error.message;
        });
        builder.addCase(createPost.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(createPost.fulfilled, (state, action) => {
            console.log('action.payload====',action.payload)
            state.loader = false;
            state.posts = [...state.posts,action?.payload];
            state.error = "";
        });
        builder.addCase(createPost.rejected, (state, action) => {
            state.loader = false;
            state.posts = [];
            state.error = action.error.message;
        });
        builder.addCase(getUserPost.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(getUserPost.fulfilled, (state, action) => {
            state.loader = false;
            state.userPosts = action.payload?.data;
            state.error = "";
        });
        builder.addCase(getUserPost.rejected, (state, action) => {
            state.loader = false;
            state.userPosts = [];
            state.error = action.error.message;
        });
        builder.addCase(getFeedImage.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(getFeedImage.fulfilled, (state, action) => {
            console.log('action.payload===',action?.payload)
            state.loader = false;
            state.feedImage = action.payload?.data;
            state.error = "";
        });
        builder.addCase(getFeedImage.rejected, (state, action) => {
            state.loader = false;
            state.feedImage = [];
            state.error = action.error.message;
        });
    },
});

export default PostReducer.reducer;
