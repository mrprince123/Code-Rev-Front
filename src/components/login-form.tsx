import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../App";
import { useDispatch } from "react-redux";
import { login } from "../Redux/AuthSlice";
import toast, { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/auth/login`;
      const response = await axios.post(
        url,
        { email, password },
        { withCredentials: true },
      );
      dispatch(
        login({ user: response.data.data, token: response.data.accessToken }),
      );
      toast.success(response.data.message);
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Login failed", error);
    }
  };

  // Add this inside your component
  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      const token = credentialResponse.credential;
      const url = `${baseUrl}/auth/google`;
      const response = await axios.post(
        url,
        { token },
        { withCredentials: true },
      );
      dispatch(
        login({ user: response.data.data, token: response.data.accessToken }),
      );
      toast.success(response.data.message);
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Login failed", error);
    }
  };

  const handleGoogleLoginError = () => {
    toast.error("Google Login Failed. Please try again.");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="p-2 border border-gray-400 rounded-lg w-full"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <label htmlFor="password">Password</label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <input
            className="p-2 border border-gray-400 rounded-lg w-full"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            required
            placeholder="xxxxxxxxxx"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black font-medium text-white p-2 rounded-xl"
        >
          Login
        </button>
        <div className="relative flex items-center justify-center text-sm text-muted-foreground">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 bg-white">Or continue with</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <div className="flex justify-center">
          {/* Google Login Button  */}
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </GoogleOAuthProvider>
        </div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <NavLink to="/register" className="underline underline-offset-4">
          Sign up
        </NavLink>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </form>
  );
}
