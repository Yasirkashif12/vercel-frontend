"use client";

import { useRouter } from "next/navigation";

export default function BackToDashboardButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/dashboard")}
      className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
    >
      &larr; back to dashboard
    </button>
  );
}
