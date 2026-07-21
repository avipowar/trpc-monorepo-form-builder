"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormGrid } from "~/components/form-grid";
import { useListForms, useDeleteForm } from "~/hooks/api/form";
import { Plus, Search } from "lucide-react";

export default function MyFormsPage() {
  const router = useRouter();

  const { forms = [], isLoading } = useListForms();
  const { deleteFormAsync } = useDeleteForm();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");

  const handleDeleteForm = async (id: string) => {
    try {
      await deleteFormAsync({ id } as any);
    } catch (error) {
      console.error("Failed to delete form:", error);
    }
  };

  const filteredForms = forms.filter((form) => {
    const matchesSearch = form.title.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === "PUBLISHED") {
      return matchesSearch && form.status?.toUpperCase() === "PUBLISHED";
    }
    if (selectedFilter === "DRAFT") {
      return matchesSearch && form.status?.toUpperCase() === "DRAFT";
    }
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-6xl mx-auto space-y-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              My Forms
            </h1>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Create, manage, and analyze your forms in one place.
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-zinc-50 dark:text-zinc-950 px-4 py-2.5 text-xs font-bold transition-all cursor-pointer shadow-md shrink-0"
          >
            <Plus className="h-4 w-4" /> Create New Form
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-bold">
            <button
              onClick={() => setSelectedFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedFilter === "ALL"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              ALL FORMS
            </button>
            <button
              onClick={() => setSelectedFilter("PUBLISHED")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedFilter === "PUBLISHED"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              PUBLISHED
            </button>
            <button
              onClick={() => setSelectedFilter("DRAFT")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedFilter === "DRAFT"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              DRAFT
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search forms..."
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pl-9 pr-4 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <FormGrid forms={filteredForms} isLoading={isLoading} onDelete={handleDeleteForm} />
      </div>
    </div>
  );
}
