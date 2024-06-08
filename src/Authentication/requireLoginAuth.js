import React from "react";
import { useAuth } from "./auth";
import { Navigate } from "react-router-dom";

function RequireLoginAuth({ children }) {
    const auth = useAuth();
    if (auth.token) {
        return <Navigate to="/home"/>;
    }
    return children;
}

export default RequireLoginAuth;
