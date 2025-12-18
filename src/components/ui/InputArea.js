"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  label,
  placeholder,
  register,
  errors,
  name,
  type = "text",
  togglePassword = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = togglePassword
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={inputType}
        placeholder={placeholder}
        {...register(name, { required: `${label} is required` })}
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {togglePassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}
