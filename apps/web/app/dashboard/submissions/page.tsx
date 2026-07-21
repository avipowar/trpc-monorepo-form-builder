"use client";

import { useListAllSubmissions } from "~/hooks/api/form";
import Link from "next/link";
import { Inbox, Loader2, Calendar, ArrowLeft, LayoutDashboard, Database } from "lucide-react";

export default function SubmissionsPage() {
  const { allSubmissions, isLoading, error } = useListAllSubmissions();

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] w-full flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 p-4">
        <Loader2 className="h-8 w-8 animate-spin mb-3 text-emerald-500" />
        <p className="text-xs font-semibold tracking-wide uppercase">
          Loading your submissions... ☕
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[80vh] w-full items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center shadow-xl">
          <h2 className="text-sm font-bold text-red-500">Failed to fetch submissions</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!allSubmissions || allSubmissions.length === 0) {
    return (
      <div className="flex min-h-[80vh] w-full items-center justify-center p-4">
        <div className="w-full max-w-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl p-10 flex flex-col items-center justify-center space-y-6 shadow-2xl text-center">
          <div className="h-16 w-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 shadow-inner">
            <Inbox className="h-7 w-7 animate-pulse text-emerald-500" />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-xl text-zinc-900 dark:text-zinc-50 tracking-tight">
              No Submissions Yet
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
              Share your public form links with users to start receiving real-time data! 🚀
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 text-xs font-bold w-full sm:w-auto rounded-xl px-6 py-3 transition-all cursor-pointer bg-zinc-900 dark:bg-zinc-800 text-zinc-50 dark:text-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-700 shadow-md"
          >
            <ArrowLeft className="h-4 w-4" /> Go back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-6xl mx-auto space-y-8 w-full">
        <div className="flex items-start justify-between pb-6 w-full">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Database className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                Form Submissions
              </h1>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 pl-11 hidden sm:block leading-relaxed tracking-wide">
              Review and analyze all responses collected across your active forms.
            </p>
          </div>

          {/* Dashboard Button */}
          <div className="shrink-0 pt-0.5">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white transition-all duration-200 cursor-pointer shadow-sm dark:shadow-md select-none"
            >
              <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
            </Link>
          </div>
        </div>

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
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm dark:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md dark:hover:shadow-2xl transition-all duration-200 flex flex-col justify-between space-y-4 group"
              >
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  <div className="flex items-center gap-2 max-w-[70%]">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 shadow-md shadow-emerald-500/45 animate-pulse" />
                    <span className="font-bold text-xs text-zinc-800 dark:text-zinc-200 truncate capitalize tracking-wide">
                      {submission.formTitle || "Untitled Form"}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-md shrink-0">
                    #{submission.id.split("-")[0]}
                  </span>
                </div>

                <div className="space-y-2 flex-grow">
                  {submission.values && submission.values.length > 0 ? (
                    submission.values.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/60 rounded-xl px-3 py-2.5 gap-3"
                      >
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 shrink-0 max-w-[100px] truncate select-none">
                          {item.label || "Field"}
                        </span>

                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 truncate max-w-[150px] capitalize text-right">
                          {item.value}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-zinc-500 dark:text-zinc-600 italic block text-center py-2">
                      No responses
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-3 mt-auto select-none">
                  <Calendar className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-500 shrink-0" />
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
