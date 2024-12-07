"use client";

import React, { useState } from "react";
import { useAppContext, useAuthContext } from "../../../provider";

const Login = () => {
  const { setIsLoggedIn, setUserData } = useAuthContext()!;
  const { createNotification, setIsLoading, isLoading } = useAppContext()!;

  const [formObj, setFormObj] = useState<any>({
    email: "",
    password: "",
    isAdmin: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Replace the URL with your backend login API
      const response = await fetch(
        `http://localhost:8000/${
          formObj.isAdmin ? "admin" : "user"
        }/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formObj),
        }
      );

      const data = await response.json();
      if (response.ok) {
        const { accessToken, user } = data;

        // Store token in localStorage
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("user_data", JSON.stringify(user));

        // Set authentication state in context
        setIsLoggedIn(true);
        setUserData(user);

        // Optional: Store expiration time for the token
        const expiresIn = 3600; // You can adjust this based on your backend response
        const expiresAt = new Date().getTime() + expiresIn * 1000;
        localStorage.setItem("access_token_expires_at", expiresAt.toString());

        createNotification("Login successful", "success");
        setIsLoading(false);
      } else {
        console.log(data);
        createNotification(data.message, "error");
        setIsLoading(false);
      }
    } catch (error: any) {
      createNotification(error, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-80"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            value={formObj.email}
            onChange={(e) => setFormObj({ ...formObj, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            value={formObj.password}
            onChange={(e) =>
              setFormObj({ ...formObj, password: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="isAdmin"
            className="block text-sm font-medium text-gray-700"
          >
            Are you an Admin?
          </label>
          <input
            type="checkbox"
            id="isAdmin"
            className="mt-1"
            checked={formObj.isAdmin}
            onChange={(e) =>
              setFormObj({ ...formObj, isAdmin: e.target.checked })
            }
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
