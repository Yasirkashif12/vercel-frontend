// src/components/layout/Navbar.js
"use client";

import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const pathname = usePathname();

  // Define routes where you DON'T want the logout button to appear
  const authRoutes = ["/login", "/signup"];

  // If the current path is in the authRoutes list, return nothing
  if (authRoutes.includes(pathname)) {
    return null;
  }

  return (
    <nav className="p-4 flex justify-between items-center bg-white shadow-sm">
      <h1 className="font-bold text-xl">AI Summarizer</h1>
      <LogoutButton />
    </nav>
  );
}
