import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const cookieToken = Cookies.get('token');
    const [token,setToken] = useState(cookieToken)
    const login = (data) => {
        Cookies.set('token', data?.accessToken, {expires: 7, secure: true});
        Cookies.set('user',JSON.stringify(data));
        setToken(data?.accessToken)
    };
    const logout = () => {
        Cookies.remove('token');
        setToken(null)
    };
    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = () => {
    return useContext(AuthContext);
};