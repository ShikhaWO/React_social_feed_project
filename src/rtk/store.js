import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./reducers/authReducer";
import postReducer from "./reducers/postReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer
    },
    // middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(logger),
});

export default store;
