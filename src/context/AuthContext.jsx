import React, { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import authService from '../service/auth.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken, removeLocalItem, getLocalItem] = useLocalStorage('authToken', null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state
    const [user, setUser] = useState(null);

    const verifyToken = async () => {
        // Use getLocalItem to get the latest token
        const token = getLocalItem(); 
        if (token) {
            try {
                const userData = await authService.verifyToken(token);
                setUser(userData); // Set user data from token verification
                setIsAuthenticated(true); // User is authenticated
            } catch (error) {
                console.error('Token verification failed:', error);
                setIsAuthenticated(false); // Token is invalid
            }
        } else {
            setIsAuthenticated(false); // No token, not authenticated
        }
        setLoading(false); // Loading is done
    };

    useEffect(() => {
        verifyToken();
    }, [authToken]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthToken, loading, user, verifyToken, removeLocalItem }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
