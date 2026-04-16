import { createContext, useState, useContext } from "react";
import authServices from "../services/authServices";

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [token, setToken] = useState((localStorage.getItem("token") || null))
    const [email, setEmail] = useState((localStorage.getItem("email") || null))

    const register = async (userData) => {
        const response = await authServices.register(userData);
        setToken(response.token);
        setEmail(response.email);
        localStorage.setItem("token", response.token);
        localStorage.setItem("email", response.email);
    };

    const login = async (userData) => {
        const response = await authServices.login(userData);
        setToken(response.token);
        setEmail(response.email);
        localStorage.setItem("token", response.token);
        localStorage.setItem("email", response.email);
    };

    const logout = () => {
        setToken(null);
        setEmail(null);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
    };

    return (
        <AuthContext.Provider value={{ token, email, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
