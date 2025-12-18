"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

import Input from "@/components/ui/InputArea";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import useLoading from "@/hooks/useLoading";
import Link from "next/link";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { loading, withLoading } = useLoading();

  const onSubmit = async (data) => {
    await withLoading(async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
          data,
        );

        if (response.status !== 201) {
          toast.error("User not created successfully");
          return;
        }

        toast.success("User created successfully");
        router.redirect("/login");
      } catch (error) {
        const message = error.response?.data?.message || error.message;
        toast.error(message || "Failed to create user");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            placeholder="Enter your name"
            name="name"
            register={register}
            errors={errors}
          />

          <Input
            label="Email plus"
            placeholder="Enter your email"
            name="email"
            type="email"
            register={register}
            errors={errors}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            name="password"
            type="password"
            togglePassword={true} // reusable show/hide handled inside Input
            register={register}
            errors={errors}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full max-w-xs flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Loader size={20} /> : "Sign Up"}
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
