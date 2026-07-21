"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useListForms, useListAllSubmissions } from "~/hooks/api/form";
import { useUser } from "~/hooks/api/auth";
import {
  FileText,
  Inbox,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { forms = [], isLoading: isLoadingForms } = useListForms();
  const { allSubmissions = [], isLoading: isLoadingSubmissions } = useListAllSubmissions();
  const { user, isLoading: isLoadingUser } = useUser();

  const totalForms = forms.length;
  const totalSubmissions = allSubmissions.length;
  const publishedCount = forms.filter((f) => f.status?.toUpperCase() === "PUBLISHED").length;
  const draftCount = forms.filter((f) => f.status?.toUpperCase() === "DRAFT").length;

  if (isLoadingForms || isLoadingSubmissions || isLoadingUser) {
    return (
      <div className="flex min-h-[80vh] w-full flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 p-4">
        <Loader2 className="h-8 w-8 animate-spin mb-3 text-emerald-500" />
        <p className="text-xs font-semibold tracking-wide uppercase">
          Loading Dashboard Analytics... ☕
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 pb-24 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                Dashboard Overview
              </h1>
              <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Welcome back{user?.fullName ? `, ${user.fullName}` : ""}! Here is a quick snapshot of
              your forms & responses.
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/forms")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 px-4 py-2.5 text-xs font-bold transition-all cursor-pointer shadow-md shrink-0"
          >
            <Plus className="h-4 w-4" /> Manage All Forms
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm dark:shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Total Forms
              </span>
              <div className="h-8 w-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <FileText className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
              {totalForms}
            </div>
            <p className="text-[10px] text-zinc-400">Forms created so far</p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm dark:shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Submissions
              </span>
              <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Inbox className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
              {totalSubmissions}
            </div>
            <p className="text-[10px] text-zinc-400">Total responses collected</p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm dark:shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Published
              </span>
              <div className="h-8 w-8 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-green-600 dark:text-green-400">
              {publishedCount}
            </div>
            <p className="text-[10px] text-zinc-400">Active public forms</p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm dark:shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Drafts</span>
              <div className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
              {draftCount}
            </div>
            <p className="text-[10px] text-zinc-400">Unpublished forms</p>
          </div>
        </div>

        {/* Nav Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm dark:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">Manage My Forms</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                View all created forms, edit fields, generate public links, or delete forms.
              </p>
            </div>
            <Link
              href="/dashboard/forms"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2"
            >
              Go to My Forms{" "}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm dark:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200">
                <Inbox className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">
                View Submissions
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Check form responses collected across all active forms in real-time.
              </p>
            </div>
            <Link
              href="/dashboard/submissions"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2"
            >
              Go to Submissions{" "}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
