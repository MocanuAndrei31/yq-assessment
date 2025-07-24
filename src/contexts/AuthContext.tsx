import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthState, LoginCredentials, User } from "../types/auth";
import { AuthContext } from "./AuthContextDefinition";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setAuthState((prev: AuthState) => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState((prev: AuthState) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setAuthState((prev: AuthState) => ({ ...prev, isLoading: true }));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (credentials.email && credentials.password.length >= 6) {
      const user: User = {
        id: "1",
        email: credentials.email,
        name: credentials.email.split("@")[0],
      };
      const authToken = "session-" + Date.now();

      localStorage.setItem("authToken", authToken);
      localStorage.setItem("user", JSON.stringify(user));

      setAuthState({
        user: user,
        token: authToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState((prev: AuthState) => ({ ...prev, isLoading: false }));
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
