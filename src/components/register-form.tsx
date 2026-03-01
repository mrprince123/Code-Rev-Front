import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../App";
import toast, { Toaster } from "react-hot-toast";

export function RegisterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/auth/register`;
      const response = await axios.post(
        url,
        { name, email, password },
        { withCredentials: true },
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Register failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details below to register to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="name">Name</label>
          <input
            className="p-2 border border-gray-300 rounded-lg w-full"
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            placeholder="John Paul"
            required
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="p-2 border border-gray-300 rounded-lg w-full"
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
            className="p-2 border border-gray-300 rounded-lg w-full"
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
          Register
        </button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <NavLink to="/login" className="underline underline-offset-4">
          Sign in
        </NavLink>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </form>
  );
}
