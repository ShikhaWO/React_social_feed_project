import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {React} from 'react';
import { toast } from "react-toastify";
import axiosInstance from "../../axiosInstance"

const initialState = {
    loader: false,
    user: {},
    error: "",
};

export const SignInUser = createAsyncThunk(
    "auth/sign-up",
    async (userData, { rejectWithValue}) => {
        try {
            const response = await axiosInstance.post("http://localhost:5000/auth/sign-up", userData);
            toast.success("Sign up Successfully");
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const logInUser = createAsyncThunk(
    "auth/login",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("http://localhost:5000/auth/login", userData);
            const token = response?.data?.data?.accessToken;

            toast.success("Login Successfully");
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "auth/delete-User",
    async ({ id, toast }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`http://localhost:5000/auth/delete-User/${id}`);
            toast.success("Tour Deleted Successfully");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const AuthReducer = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(logInUser.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(logInUser.fulfilled, (state, action) => {
            state.loader = false;
            state.user = action.payload;
            state.error = "";
        });
        builder.addCase(logInUser.rejected, (state, action) => {
            state.loader = false;
            state.user = [];
            state.error = action.error.message;
        });

        // [createTour.pending]: (state, action) => {
        //     state.loading = true;
        // },
        //     [createTour.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     state.tours = [action.payload];
        // },
        //     [createTour.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload.message;
        // },
        //     [getToursByUser.pending]: (state, action) => {
        //     state.loading = true;
        // },
        //     [getToursByUser.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     state.userTours = action.payload;
        // },
        //     [getToursByUser.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload.message;
        // },
        //
        //     [updateTour.pending]: (state, action) => {
        //     state.loading = true;
        // },
        //     [updateTour.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     const {
        //         arg: { id },
        //     } = action.meta;
        //     if (id) {
        //         state.userTours = state.userTours.map((item) =>
        //             item._id === id ? action.payload : item
        //         );
        //         state.tours = state.tours.map((item) =>
        //             item._id === id ? action.payload : item
        //         );
        //     }
        // },
        //     [updateTour.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload.message;
        // }
        //     ,
        //     [deleteTour.pending]: (state, action) => {
        //     state.loading = true;
        // },
        //     [deleteTour.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     const {
        //         arg: { id },
        //     } = action.meta;
        //     if (id) {
        //         state.userTours = state.userTours.filter((item) => item._id !== id);
        //         state.tours = state.tours.filter((item) => item._id !== id);
        //     }
        // },
        //     [deleteTour.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload.message;
        // },
    },
});

export default AuthReducer.reducer;
