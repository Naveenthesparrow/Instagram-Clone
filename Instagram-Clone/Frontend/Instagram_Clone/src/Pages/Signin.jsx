import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/AuthContext";
import GoogleLoginButton from "../Components/GoogleLogin/GoogleLoginButton";

export default function SignIn() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    signin();
  };

  const signin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        if (data.token) {
          login(data);
          navigate("/");
        }

        setEmail("");
        setPassword("");
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <ToastContainer />
      <div className="w-full max-w-sm space-y-6">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-center mb-8">
            <img
              src="https://kq-storage.s3.ap-south-1.amazonaws.com/logo.png"
              alt="Logo"
              className="h-14 w-auto"
            />
          </div>
          <p className="text-center text-gray-500 mb-4">
            Log in to see photos and videos from your friends.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
            >
              Sign In
            </button>
          </form>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <div className="flex justify-center">
            <GoogleLoginButton>Continue With Google</GoogleLoginButton>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg text-center mt-1">
          <p>
            Don't have an account?{" "}
            <Link to={`/signup`} className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
