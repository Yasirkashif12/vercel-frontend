// src/components/ui/Button.js
"use client";

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 
        rounded-md 
        font-semibold 
        text-sm
        transition-all 
        duration-200
        active:scale-95
        disabled:opacity-50 
        disabled:cursor-not-allowed
        border-2 
        ${className ? className : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"} 
      `}
    >
      {children}
    </button>
  );
}
