"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import Loader from "@/components/Loader";

export default function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("You are not logged in!");
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get("http://localhost:5000/summaries/get", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setHistory(response.data);
            } catch (error) {
                console.error(error);
                toast.error("Error fetching history");
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen bg-white px-4">
            <div className="mx-auto max-w-4xl space-y-8 pb-12">

                <div className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md py-6 mb-6">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
                            History
                        </h1>
                        <p className="text-sm text-gray-500">
                            Your past generated summaries and insights.
                        </p>
                    </div>
                    <Link
                        href="/dashboard"
                        className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
                    >
                        &larr; back to dashboard
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader />
                    </div>
                ) : history.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-100 border-dashed">
                        <p className="text-gray-500">No history found yet.</p>
                        <Link href="/dashboard" className="mt-4 inline-block text-black font-medium underline">
                            Create your first summary
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {history.map((item) => (
                            <div
                                key={item.id}
                                className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-black/20 hover:shadow-md"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        {formatDate(item.createdAt || item.date)}
                                    </span>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 mb-3">Summary</h3>
                                        <div className="text-gray-600 text-sm leading-7">
                                            {item.summary}
                                        </div>
                                    </div>

                                    {(item.actionItems?.length > 0 || item.risks?.length > 0 || item.nextSteps?.length > 0) && (
                                        <div className="grid grid-cols-1 gap-8 pt-6 border-t border-gray-50 sm:grid-cols-3">
                                            {item.actionItems?.length > 0 && (
                                                <div className="space-y-3">
                                                    <h4 className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                                                        Action Items
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {item.actionItems.map((action, idx) => (
                                                            <li key={idx} className="text-sm text-gray-700 leading-snug">
                                                                {action}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {item.risks?.length > 0 && (
                                                <div className="space-y-3">
                                                    <h4 className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                                                        Risks
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {item.risks.map((risk, idx) => (
                                                            <li key={idx} className="text-sm text-gray-700 leading-snug">
                                                                {risk}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {item.nextSteps?.length > 0 && (
                                                <div className="space-y-3">
                                                    <h4 className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                                                        Next Steps
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {item.nextSteps.map((step, idx) => (
                                                            <li key={idx} className="text-sm text-gray-700 leading-snug">
                                                                {step}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}