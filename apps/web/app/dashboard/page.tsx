"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useCreateForm, useListForms } from "../../hooks/api/form";
import { useUser } from "../../hooks/api/auth";
import { Plus, LayoutDashboard, FileText, Settings, Search } from "lucide-react";

export default function DashboardPage() {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🆕 Form States (Title & Description matching your Drizzle Schema)
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");

  // Real Hooks Integration
  const { user, isLoading: isUserLoading } = useUser();
  const { forms, isLoading: isFormsLoading } = useListForms();
  const { createFormAsync, status } = useCreateForm();

  // Filtering the real database forms
  const filteredForms = (forms || []).filter((form) => {
    if (activeFilter === "all") return true;
    const formStatus = "draft";
    return formStatus === activeFilter;
  });

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* १. SIDEBAR SECTION */}
      <aside className="w-64 border-r border-border bg-card/30 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          <div className="text-xl font-bold tracking-wider text-primary">TokyoForms</div>
          <nav className="space-y-2">
            <button className="flex w-full items-center gap-3 rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-foreground">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all">
              <FileText className="h-4 w-4" /> My Forms
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all">
              <Settings className="h-4 w-4" /> Settings
            </button>
          </nav>
        </div>

        <div className="rounded-xl bg-secondary/40 p-4 border border-border/60">
          <p className="text-xs text-muted-foreground">Logged in as</p>
          <p className="text-sm font-medium truncate">
            {isUserLoading ? "Loading..." : user?.fullName || "Avinash Powar"}
          </p>
        </div>
      </aside>

      {/* २. MAIN CONTENT AREA */}
      <main className="flex-1 p-8 md:p-12">
        {/* TOP HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-border/60">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Forms</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Create, manage, and analyze your forms in one place.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Create New Form
          </button>
        </div>

        {/* ३. ADVANCED FILTER BAR */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2 rounded-xl bg-secondary/50 p-1.5 border border-border/40">
            {["all", "published", "draft"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === tab
                    ? "bg-card text-foreground shadow-sm border border-border/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "all" ? "All Forms" : tab}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search forms..."
              className="w-full rounded-xl border border-border bg-card/50 py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* ४. REAL FORMS GRID */}
        {isFormsLoading ? (
          <div className="mt-12 text-center text-sm text-muted-foreground animate-pulse">
            Loading your premium forms... ☕
          </div>
        ) : filteredForms.length === 0 ? (
          <div className="mt-12 text-center text-sm text-muted-foreground border border-dashed border-border rounded-2xl p-12">
            No forms found. Click "Create New Form" to get started! 🚀
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredForms.map((form) => (
              <div
                key={form.id}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:scale-[1.02] hover:shadow-lg dark:hover:border-primary/40"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-500">
                    Draft
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : "Just now"}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-lg tracking-tight group-hover:text-primary transition-colors truncate">
                  {form.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 h-8">
                  {form.description || "No description provided."}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
                  <span>Submissions</span>
                  <span className="font-bold text-foreground text-sm font-mono">0</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ५. MODERN MINIMALIST MODAL - WITH DESCRIPTION FIELD */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-300">
            <div
              style={{
                backgroundColor: theme === "dark" ? "#121214" : "#ffffff",
                borderColor: theme === "dark" ? "#232326" : "#e4e4e7",
              }}
              className="w-full max-w-md rounded-2xl border p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200"
            >
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Create New Form
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 mb-6">
                Give your new form a clean, minimal title and description.
              </p>

              {/* Input Fields Wrapper */}
              <div className="space-y-4">
                {/* Form Title Input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                    Form Title
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g., Customer Feedback Form ☕"
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-sm text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-all duration-200"
                  />
                </div>

                {/* 🆕 Form Description Textarea (Symmetrical Style) */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                    Description (Optional)
                  </label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="What is this form about? (Max 300 characters)"
                    maxLength={300}
                    rows={3}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-sm text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-all duration-200 resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="mt-8 flex justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800/60 pt-4">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormTitle("");
                    setFormDescription(""); // 🆕 Reset on cancel
                  }}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-5 py-2.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-50 cursor-pointer transition-all duration-300"
                >
                  Cancel
                </button>

                <button
                  disabled={!formTitle.trim() || status === "pending"}
                  onClick={async () => {
                    try {
                      // 🆕 Passing both title and description to your Drizzle service via tRPC
                      await createFormAsync({
                        title: formTitle,
                        description: formDescription.trim() || undefined,
                      });

                      setIsModalOpen(false);
                      setFormTitle("");
                      setFormDescription(""); // 🆕 Reset on success
                    } catch (error) {
                      console.error("Failed to create form:", error);
                    }
                  }}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-5 py-2.5 text-xs font-semibold text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 active:scale-95 disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-all duration-300"
                >
                  {status === "pending" ? "Creating..." : "Create Form"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
