"use client";

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
