// src/components/layout/LogoutButton.js (or wherever you moved it)
"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import useLoading from "@/hooks/useLoading";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";

export default function LogoutButton() {
  const router = useRouter();
  const { loading, withLoading } = useLoading();

  const handleLogout = async () => {
    await withLoading(async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await axios.post(
          `${apiUrl}/auth/logout`,
          {},
          {
            withCredentials: true,
          },
        );

        if (response.status === 200 || response.status === 201) {
          toast.success("Logged out successfully");
          router.replace("/login");
        }
      } catch (error) {
        console.error("Logout error", error);
        toast.error("Logout failed");
      }
    });
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      className="bg-transparent text-red-500 hover:text-red-700 font-medium text-sm"
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <Loader size={16} /> <span>Exiting...</span>
        </div>
      ) : (
        "Logout"
      )}
    </Button>
  );
}
