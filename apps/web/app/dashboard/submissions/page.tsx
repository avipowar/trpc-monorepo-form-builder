"use client";

import { useListAllSubmissions } from "~/hooks/api/form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Inbox, Loader2, Calendar, ArrowLeft, LayoutDashboard } from "lucide-react";

export default function SubmissionsPage() {
  const router = useRouter();
  const { allSubmissions, isLoading, error } = useListAllSubmissions();

  if (isLoading) {
    return (
      <div className="fixed inset-0 md:left-64 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 p-4">
        <Loader2 className="h-8 w-8 animate-spin mb-3 text-zinc-900 dark:text-zinc-50" />
        <p className="text-xs font-semibold tracking-wide uppercase">
          Loading all submissions... ☕
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 md:left-64 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center shadow-xl">
          <h2 className="text-sm font-bold text-red-500">Failed to fetch submissions</h2>
          <p className="text-xs text-zinc-400 mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!allSubmissions || allSubmissions.length === 0) {
    return (
      <div className="fixed inset-0 md:left-64 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] rounded-2xl p-10 flex flex-col items-center justify-center space-y-6 shadow-2xl text-center transition-all">
          <div className="h-16 w-16 rounded-full bg-zinc-100 dark:bg-zinc-900/80 flex items-center justify-center text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 shadow-inner">
            <Inbox className="h-7 w-7 animate-pulse text-zinc-500 dark:text-zinc-400" />
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
            className="inline-flex items-center justify-center gap-2 text-xs font-bold w-full sm:w-auto rounded-xl px-6 py-3 transition-all cursor-pointer bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800/80 shadow-md"
          >
            <ArrowLeft className="h-4 w-4 text-zinc-500" /> Go back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pt-4 px-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Form Submissions
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Review and analyze all responses collected across your active forms.
          </p>
        </div>

        {/* 🎯 Next.js Native Link: यामुळे क्लिक केल्यावर पेज गॅरंटीड चेंज होणार */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 px-3 py-2 rounded-xl transition-all cursor-pointer bg-card/50 hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
        </Link>
      </div>

      {/* 📊 Table */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                <th className="py-4 px-6 w-[140px]">Submission ID</th>
                <th className="py-4 px-6 w-[200px]">Form Reference</th>
                <th className="py-4 px-6">Submitted Data</th>
                <th className="py-4 px-6 w-[180px]">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
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
                  <tr
                    key={submission.id}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors group align-top"
                  >
                    <td className="py-5 px-6 font-mono text-[11px] text-zinc-400 dark:text-zinc-500 pt-6">
                      #{submission.id.split("-")[0]}...
                    </td>

                    <td className="py-5 px-6 font-semibold text-zinc-900 dark:text-zinc-50 max-w-[200px] truncate capitalize pt-6">
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{submission.formTitle || "Untitled Form"}</span>
                      </div>
                    </td>

                    <td className="py-5 px-6">
                      <div className="space-y-3 max-w-xl my-1">
                        {submission.values && submission.values.length > 0 ? (
                          submission.values.map((item, idx) => (
                            <div key={idx} className="flex items-baseline gap-3 text-xs">
                              <span className="text-zinc-400 dark:text-zinc-500 font-medium tracking-wide w-[110px] shrink-0 capitalize">
                                {item.label || "Field"}:
                              </span>
                              {/* 🎯 FORCE DARK CLASSES: '!' ऑपरेटर वापरून पांढरा रंग पूर्णपणे ब्लॉक केला आहे */}
                              <span className="text-zinc-800 dark:text-zinc-200 font-semibold !bg-zinc-100 dark:!bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl px-3 py-1.5 min-w-[140px] max-w-[320px] break-words capitalize shadow-sm">
                                {item.value}
                              </span>
                            </div>
                          ))
                        ) : (
                          <span className="text-xs text-zinc-500 italic">No data values found</span>
                        )}
                      </div>
                    </td>

                    <td className="py-5 px-6 text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap pt-6">
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                        {submittedAt}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
