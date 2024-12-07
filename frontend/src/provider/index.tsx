"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

// Create Contexts
const AppContext = createContext<any>(null);
const AuthContext = createContext<any>(null);

export const useAppContext = () => useContext(AppContext);
export const useAuthContext = () => useContext(AuthContext);

export const AppProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("access_token");
      const user = JSON.parse(localStorage.getItem("user_data") || "{}");
      const tokenExpiresAt = localStorage.getItem("access_token_expires_at");

      if (token && user && user.role && tokenExpiresAt) {
        const currentTime = new Date().getTime();

        if (currentTime < parseInt(tokenExpiresAt, 10)) {
          // Valid token and user
          setIsLoggedIn(true);
          setUserData(user);

          // Redirect based on role if not already on the correct route
          if (user.role === "ADMIN" && pathname !== "/dashboard") {
            router.replace("/dashboard");
          } else if (user.role !== "ADMIN" && pathname !== "/upload-file") {
            router.replace("/upload-file");
          }

          setIsLoading(false); // Mark as done loading
          return; // Exit early for valid case
        }
      }

      // Invalid token or user data
      localStorage.removeItem("access_token");
      localStorage.removeItem("access_token_expires_at");
      localStorage.removeItem("user_data");
      setIsLoggedIn(false);
      setUserData(null);

      if (pathname !== "/auth/login") {
        router.replace("/auth/login");
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, [pathname, router, isLoggedIn]);

  const createNotification = (
    message = "",
    type: "info" | "success" | "warning" | "error" = "error"
  ) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <AppContext.Provider
      value={{ isLoading, setIsLoading, createNotification }}
    >
      <AuthContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}
      >
        <ToastContainer />
        {children}
      </AuthContext.Provider>
    </AppContext.Provider>
  );
};
