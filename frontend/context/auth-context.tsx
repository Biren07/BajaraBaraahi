"use client";

import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

interface User {
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<any>;
  register: (
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<any>;
  logout: () => Promise<void>;
  googleAuth: (data: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Helper to normalize user data globally
const normalizeUser = (user: any): User | null => {
  if (!user) return user;
  return {
    ...user,
    profileImage:
      typeof user.profileImage === "string"
        ? { url: user.profileImage }
        : user.profileImage,
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // ✅ LOAD USER ON REFRESH
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setUser(null);
          return;
        }

        const res = await authService.getLoggedUser();

        const userData = res?.user || res;

        setUser(normalizeUser(userData));
      } catch (error: any) {
        console.error("Auth load error:", error);

        if (error?.response?.status === 401) {
          localStorage.removeItem("token");
        }

        setUser(null);
      }
    };

    loadUser();
  }, []);

  // ✅ LOGIN
  const login = async (email: string, password: string) => {
    const res = await authService.login(email, password);

    localStorage.setItem("token", res.token);

    setUser(normalizeUser(res?.user || res));

    return res;
  };

  // ✅ REGISTER
  const register = async (
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    password: string
  ) => {
    const res = await authService.register(
      firstname,
      lastname,
      email,
      phone,
      password
    );

    localStorage.setItem("token", res.token);

    setUser(normalizeUser(res?.user || res));

    return res;
  };

  // ✅ LOGOUT
  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  // ✅ GOOGLE AUTH
  const googleAuth = async (data: any) => {
    const res = await authService.googleAuth(data);

    localStorage.setItem("token", res.token);

    setUser(normalizeUser(res?.user || res));

    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        googleAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};