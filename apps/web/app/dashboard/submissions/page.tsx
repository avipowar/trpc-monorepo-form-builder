"use client";

import { useListAllSubmissions } from "~/hooks/api/form";
import Link from "next/link";
import {
  Inbox,
  Loader2,
  Calendar,
  ArrowLeft,
  LayoutDashboard,
  Database,
  ClipboardList,
} from "lucide-react";

export default function SubmissionsPage() {
  const { allSubmissions, isLoading, error } = useListAllSubmissions();

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="fixed inset-0 md:left-64 flex flex-col items-center justify-center text-zinc-400 p-4 bg-[#09090b]">
        <Loader2 className="h-8 w-8 animate-spin mb-3 text-emerald-500" />
        <p className="text-xs font-semibold tracking-wide uppercase text-zinc-500">
          Loading your submissions... ☕
        </p>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="fixed inset-0 md:left-64 flex items-center justify-center p-4 bg-[#09090b]">
        <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center shadow-xl">
          <h2 className="text-sm font-bold text-red-500">Failed to fetch submissions</h2>
          <p className="text-xs text-zinc-400 mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  // 3. Empty State
  if (!allSubmissions || allSubmissions.length === 0) {
    return (
      <div className="fixed inset-0 md:left-64 flex items-center justify-center p-4 z-10 bg-[#09090b]">
        <div className="w-full max-w-md border border-zinc-800 bg-[#121214] rounded-2xl p-10 flex flex-col items-center justify-center space-y-6 shadow-2xl text-center">
          <div className="h-16 w-16 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 border border-zinc-800 shadow-inner">
            <Inbox className="h-7 w-7 animate-pulse text-emerald-500" />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-xl text-zinc-50 tracking-tight">No Submissions Yet</h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
              Share your public form links with users to start receiving real-time data! 🚀
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 text-xs font-bold w-full sm:w-auto rounded-xl px-6 py-3 transition-all cursor-pointer bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700 shadow-md"
          >
            <ArrowLeft className="h-4 w-4" /> Go back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 pb-24">
      {/* मुख्य संतुलित मॅक्स-विड्थ कंटेनर */}
      <div className="max-w-6xl mx-auto space-y-8 w-full">
        {/* 🌟 हेडर विभाग: `items-start` आणि `pb-6` मुळे आता बॉर्डर लाईन आणि टेक्स्टमध्ये कडक स्पेस दिसेल */}
        <div className="flex items-start justify-between pb-6">
          <div className="space-y-1">
            {
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Database className="h-4 w-4 text-emerald-400" />
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-zinc-50">
                  Form Submissions
                </h1>
              </div>
            }
            {/* 🎯 line-height आणि फिक्स गॅपमुळे आता ही लाईन चिकटणार नाही */}
            <p className="text-xs text-zinc-400 pl-11 hidden sm:block leading-relaxed tracking-wide mb-5">
              Review and analyze all responses collected across your active forms.
            </p>
          </div>

          {/* Dashboard Button */}
          <div className="shrink-0 pt-0.5">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl border border-zinc-800 bg-[#121214] text-zinc-300 hover:bg-emerald-600 hover:text-white transition-all duration-200 cursor-pointer shadow-md select-none"
            >
              <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
            </Link>
          </div>
        </div>

        {/* 🎯 तुझा ओरिजिनल आणि आवडलेला ३-कॉलम रिस्पॉन्सिव्ह कार्ड ग्रीड लेआउट */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {allSubmissions.map((submission) => {
            const submittedAt = submission.createdAt
              ? new Date(submission.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Just now";

            return (
              <div
                key={submission.id}
                className="bg-[#121214] border border-zinc-800/80 p-5 rounded-2xl shadow-xl hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-200 flex flex-col justify-between space-y-4 group"
              >
                {/* कार्ड हेडर: फॉर्म नाव आणि छोटा आयडी */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <div className="flex items-center gap-2 max-w-[70%]">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 shadow-md shadow-emerald-500/45 animate-pulse" />
                    <span className="font-bold text-xs text-zinc-200 truncate capitalize tracking-wide">
                      {submission.formTitle || "Untitled Form"}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-zinc-500 bg-[#161618] border border-zinc-850 px-2 py-0.5 rounded-md shrink-0">
                    #{submission.id.split("-")[0]}
                  </span>
                </div>

                {/* इनर रो अरेंजमेंट: प्रश्न आणि उत्तर */}
                <div className="space-y-2 flex-grow">
                  {submission.values && submission.values.length > 0 ? (
                    submission.values.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-[#16161a] border border-zinc-850/40 rounded-xl px-3 py-2.5 gap-3"
                      >
                        {/* डावी बाजू: लेबल */}
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0 max-w-[100px] truncate select-none">
                          {item.label || "Field"}
                        </span>

                        {/* उजवी बाजू: व्हॅल्यू */}
                        <span className="text-xs font-semibold text-emerald-400 truncate max-w-[150px] capitalize text-right">
                          {item.value}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-zinc-600 italic block text-center py-2">
                      No responses
                    </span>
                  )}
                </div>

                {/* कार्ड फूटर: तारीख */}
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 border-t border-zinc-900 pt-3 mt-auto select-none">
                  <Calendar className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                  <span className="font-mono">{submittedAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
