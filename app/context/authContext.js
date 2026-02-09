"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authService } from "@/app/services/serviceLogin";

const AuthContext = createContext(null);

const STORAGE_KEYS = {
    token: "auth_token_sgt",
    user: "auth_user_sgt",
};

function getStoredAuth() {
    if (typeof window === "undefined") return { token: null, user: null };
    try {
        const token = localStorage.getItem(STORAGE_KEYS.token);
        const userStr = localStorage.getItem(STORAGE_KEYS.user);
        const user = userStr ? JSON.parse(userStr) : null;
        return { token, user };
    } catch {
        return { token: null, user: null };
    }
}

function setStoredAuth(token, user) {
    if (typeof window === "undefined") return;
    if (token) localStorage.setItem(STORAGE_KEYS.token, token);
    else localStorage.removeItem(STORAGE_KEYS.token);
    if (user) localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEYS.user);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);


    useEffect(() => {
        function fetchAuth() {
            const { token: t, user: u } = getStoredAuth();
            setToken(t);
            setUser(u);
            setIsInitialized(true);
        }
        fetchAuth();
    }, []);

    const login = useCallback(async (credentials) => {
        const { token: newToken, user: newUser } = await authService.login(credentials);
        setToken(newToken);
        setUser(newUser);
        setStoredAuth(newToken, newUser);
        return { token: newToken, user: newUser };
    }, []);

    const logout = useCallback(() => {
        authService.logout();
        setToken(null);
        setUser(null);
        setStoredAuth(null, null);
    }, []);

    const value = {
        user,
        token,
        isAuthenticated: Boolean(token && user),
        isInitialized,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (ctx == null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
}
