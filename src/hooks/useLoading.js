"use client";
import { useState, useCallback } from "react"; // <-- Import useCallback

export default function useLoading() {
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(async (asyncFunc) => {
    setLoading(true);
    try {
      return await asyncFunc();
    } finally {
      setLoading(false);
    }
  }, []); // 3. Empty dependency array means this function reference will never change

  return { loading, setLoading, withLoading };
}
