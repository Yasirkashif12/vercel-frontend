"use client";

import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import Input from "@/components/InputAera";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `http://localhost:5000/auth/login`,
        data
      );

      if (response.status !== 200 && response.status !== 201) {
        toast.error("Invalid credentials");
        return;
      }

      localStorage.setItem("token", response.data.accessToken);

      toast.success("Login successful");

      router.push("/dashboard");
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            placeholder="Enter your email"
            name="email"
            type="email"
            register={register}
            errors={errors}
          />

          <div className="relative">
            <Input
              label="Password"
              placeholder="Enter your password"
              name="password"
              type={showPassword ? "text" : "password"}
              register={register}
              errors={errors}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full max-w-xs flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
