// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import Cookies from 'js-cookie';
// import { toast } from "react-toastify";
// import {useSelector} from "react-redux";
//
// const initialState = {
//     loader: false,
//     user: {},
//     error: "",
// };
//
// export const getUserProfile = createAsyncThunk(
//     "auth/sign-up",
//     async (userId, { rejectWithValue}) => {
//         try {
//             const response = await axios.post("http://localhost:5000/users/get-users-profile", userId);
//             console.log('response==',response)
//             toast.success("Sign up Successfully");
//             return response.data.data;
//         } catch (err) {
//             return rejectWithValue(err.response.data);
//         }
//     }
// );
//
// export const logInUser = createAsyncThunk(
//     "auth/login",
//     async (userData, { rejectWithValue }) => {
//         try {
//             const response = await axios.post("http://localhost:5000/auth/login", userData);
//             console.log('response 22==',response)
//             const token = response?.data?.data?.accessToken;
//             Cookies.set('token', token, { expires: 7, secure: true });
//             toast.success("Login Successfully");
//             return response.data.data;
//         } catch (err) {
//             return rejectWithValue(err.response.data);
//         }
//     }
// );
//
// export const deleteUser = createAsyncThunk(
//     "auth/delete-User",
//     async ({ id, toast }, { rejectWithValue }) => {
//         try {
//             const response = await axios.delete(`http://localhost:5000/auth/delete-User/${id}`);
//             toast.success("Tour Deleted Successfully");
//             return response.data;
//         } catch (err) {
//             return rejectWithValue(err.response.data);
//         }
//     }
// );
//
// const UserReducer = createSlice({
//     name: "user",
//     initialState,
//     extraReducers: (builder) => {
//         builder.addCase(logInUser.pending, (state) => {
//             state.loader = true;
//         });
//         builder.addCase(logInUser.fulfilled, (state, action) => {
//             console.log('action.payload==',action.payload)
//             state.loader = false;
//             state.user = action.payload;
//             state.error = "";
//         });
//         builder.addCase(logInUser.rejected, (state, action) => {
//             state.loader = false;
//             state.user = [];
//             state.error = action.error.message;
//         });
//
//         // [createTour.pending]: (state, action) => {
//         //     state.loading = true;
//         // },
//         //     [createTour.fulfilled]: (state, action) => {
//         //     state.loading = false;
//         //     state.tours = [action.payload];
//         // },
//         //     [createTour.rejected]: (state, action) => {
//         //     state.loading = false;
//         //     state.error = action.payload.message;
//         // },
//         //     [getToursByUser.pending]: (state, action) => {
//         //     state.loading = true;
//         // },
//         //     [getToursByUser.fulfilled]: (state, action) => {
//         //     state.loading = false;
//         //     state.userTours = action.payload;
//         // },
//         //     [getToursByUser.rejected]: (state, action) => {
//         //     state.loading = false;
//         //     state.error = action.payload.message;
//         // },
//         //
//         //     [updateTour.pending]: (state, action) => {
//         //     state.loading = true;
//         // },
//         //     [updateTour.fulfilled]: (state, action) => {
//         //     state.loading = false;
//         //     const {
//         //         arg: { id },
//         //     } = action.meta;
//         //     if (id) {
//         //         state.userTours = state.userTours.map((item) =>
//         //             item._id === id ? action.payload : item
//         //         );
//         //         state.tours = state.tours.map((item) =>
//         //             item._id === id ? action.payload : item
//         //         );
//         //     }
//         // },
//         //     [updateTour.rejected]: (state, action) => {
//         //     state.loading = false;
//         //     state.error = action.payload.message;
//         // }
//         //     ,
//         //     [deleteTour.pending]: (state, action) => {
//         //     state.loading = true;
//         // },
//         //     [deleteTour.fulfilled]: (state, action) => {
//         //     state.loading = false;
//         //     const {
//         //         arg: { id },
//         //     } = action.meta;
//         //     if (id) {
//         //         state.userTours = state.userTours.filter((item) => item._id !== id);
//         //         state.tours = state.tours.filter((item) => item._id !== id);
//         //     }
//         // },
//         //     [deleteTour.rejected]: (state, action) => {
//         //     state.loading = false;
//         //     state.error = action.payload.message;
//         // },
//     },
// });
//
// export default USerReducer.reducer;
