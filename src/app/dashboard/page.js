"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Textarea from "@/components/TextAera";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Dashboard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not logged in!");
      setLoading(false);
      return;
    }

    try {
      const payload = { content: data.notes };
      const response = await axios.post(
        `http://localhost:5000/summaries/post`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        toast.error("Failed to generate summary");
        setLoading(false);
        return;
      }

      toast.success("Summary generated successfully");
      setResult(response.data);
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Error generating summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4 py-12">
      <div className="w-full max-w-4xl space-y-8">
        <div className="sticky top-0 z-50 flex justify-end bg-white/80 backdrop-blur-md py-4 -mt-4 mb-4">
          <Link
            href="/historypage"
            className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            view history &rarr;
          </Link>
        </div>

        <div className="text-center space-y-2 px-2 sm:px-6 md:px-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black">
            AI-Powered Notes Summarizer
          </h1>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg">
            Paste your meeting notes, messages, or interviews below to generate
            concise summaries, action items, risks, and next steps.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Textarea
            placeholder="Type or paste text here..."
            name="notes"
            register={register}
            errors={errors}
            className="min-h-[150px] w-full p-4 text-base border-gray-200 focus:border-black focus:ring-0 rounded-md transition-all resize-none"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="px-6 py-2 bg-black text-white text-sm sm:text-base md:text-base font-medium hover:bg-gray-800 disabled:opacity-50 rounded-md"
              disabled={loading}
            >
              {loading ? "Processing..." : "Summarize"}
            </Button>
          </div>
        </form>

        {loading && <Loader />}

        {result && !loading && (
          <div className="mt-12 space-y-12 animate-in fade-in duration-500 px-2 sm:px-0">
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-gray-400">
                Summary
              </h2>
              <p className="text-gray-900 leading-7 text-sm sm:text-base md:text-lg">
                {result.summary}
              </p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <section className="space-y-3">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-black border-b border-black pb-2">
                  Action Items
                </h3>
                <ul className="space-y-2 pt-2">
                  {result.actionItems?.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm sm:text-base text-gray-700 leading-snug"
                    >
                      {item}
                    </li>
                  ))}
                  {!result.actionItems?.length && (
                    <li className="text-gray-300 text-sm sm:text-base">None</li>
                  )}
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-black border-b border-black pb-2">
                  Risks
                </h3>
                <ul className="space-y-2 pt-2">
                  {result.risks?.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm sm:text-base text-gray-700 leading-snug"
                    >
                      {item}
                    </li>
                  ))}
                  {!result.risks?.length && (
                    <li className="text-gray-300 text-sm sm:text-base">None</li>
                  )}
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-black border-b border-black pb-2">
                  Next Steps
                </h3>
                <ul className="space-y-2 pt-2">
                  {result.nextSteps?.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm sm:text-base text-gray-700 leading-snug"
                    >
                      {item}
                    </li>
                  ))}
                  {!result.nextSteps?.length && (
                    <li className="text-gray-300 text-sm sm:text-base">None</li>
                  )}
                </ul>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
