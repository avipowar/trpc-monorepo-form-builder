"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, AlertTriangle } from "lucide-react";

interface Form {
  id: string;
  title: string;
  description?: string | null;
  createdAt: string | null;
}

interface FormGridProps {
  forms: Form[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export function FormGrid({ forms, isLoading, onDelete }: FormGridProps) {
  const [formToDelete, setFormToDelete] = useState<string | null>(null);

  return (
    <>
      {isLoading ? (
        <div className="mt-12 text-center text-sm text-muted-foreground animate-pulse">
          Loading your premium forms... ☕
        </div>
      ) : forms.length === 0 ? (
        <div className="mt-12 text-center text-sm text-muted-foreground border border-dashed border-border rounded-2xl p-12">
          No forms found. Click "Create New Form" to get started! 🚀
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <Link
              key={form.id}
              href={`/dashboard/forms/${form.id}`}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:scale-[1.02] hover:shadow-lg dark:hover:border-primary/40 block cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-500">
                  Draft
                </span>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFormToDelete(form.id);
                  }}
                  className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer z-10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
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
            </Link>
          ))}
        </div>
      )}

      {formToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md transition-all duration-300 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500 mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Delete Form</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 mb-6">
              Are you sure you want to delete this form? This action cannot be undone.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={() => setFormToDelete(null)}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 cursor-pointer transition-all"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  onDelete(formToDelete);
                  setFormToDelete(null);
                }}
                className="w-full rounded-xl border border-red-500/40 hover:border-red-500 bg-transparent px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-500/5 cursor-pointer shadow-sm active:scale-95 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
