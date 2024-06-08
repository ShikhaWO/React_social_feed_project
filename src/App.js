import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Components/home";
import SignIn from "./Components/signin";
import Login from "./Components/login";
import Profile from "./Components/profile";
import store from "./rtk/store";
import {Provider} from "react-redux";
import Posts from "./Components/post";
import Feed from "./Components/feed";
import {AuthProvider} from "./Authentication/auth";
import RequireLoginAuth from "./Authentication/requireLoginAuth";
import RequireAuth from "./Authentication/requireAuth";

function App() {
    return (
        <Provider store={store}>
            <div>
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route path="/" element={
                                <RequireAuth>
                                    <Home/>
                                </RequireAuth>
                            }>
                                <Route index element={<Feed/>}/>
                            </Route>
                            <Route path="login"
                                   element={
                                       <RequireLoginAuth>
                                           <Login/>
                                       </RequireLoginAuth>
                                   }/>
                            <Route
                                path="*"
                                element={
                                    <RequireLoginAuth>
                                        <Login/>
                                    </RequireLoginAuth>
                                }/>
                            <Route path="home"
                                   element={
                                       <RequireAuth>
                                           <Home/>
                                       </RequireAuth>
                                   }>
                                <Route index element={<Feed/>}/>
                                <Route path="feed" element={<Feed/>}/>
                                <Route path="post" element={<Posts/>}/>
                                <Route path="profile" element={<Profile/>}/>
                            </Route>
                            <Route path="signin" element={<SignIn/>}/>
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </div>
        </Provider>
    )
};

export default App