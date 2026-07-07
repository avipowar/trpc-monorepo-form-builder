"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle, Pencil, ExternalLink, Copy, Check, FileText } from "lucide-react";

interface Form {
  id: string;
  title: string;
  description?: string | null;
  createdAt: string | null;
  submissionsCount?: number;
}

interface FormGridProps {
  forms: Form[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export function FormGrid({ forms, isLoading, onDelete }: FormGridProps) {
  const router = useRouter();
  const [formToDelete, setFormToDelete] = useState<string | null>(null);
  const [copiedFormId, setCopiedFormId] = useState<string | null>(null);

  const handleCopyLink = async (e: React.MouseEvent, formId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const publicFormLink = `${window.location.origin}/p/${formId}`;
    try {
      await navigator.clipboard.writeText(publicFormLink);
      setCopiedFormId(formId);
      setTimeout(() => setCopiedFormId(null), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

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
          {forms.map((form) => {
            const formattedDate = form.createdAt
              ? new Date(form.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "June 28, 2026";

            return (
              <div
                key={form.id}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:scale-[1.01] hover:shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="h-4 w-4 text-zinc-400 shrink-0" />
                      <h3 className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-50 truncate capitalize">
                        {form.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-500 shrink-0">
                      Draft
                    </span>
                  </div>

                  <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Created: {formattedDate}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 h-8">
                  {form.description || "No description provided."}
                </p>

                <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 dark:text-zinc-500 select-none pt-1">
                  <span>📩</span>
                  <span>{form.submissionsCount ?? 0} Submissions</span>
                </div>

                <div className="h-[1px] bg-border/50 w-full" />

                <div className="flex items-center justify-between gap-1.5 pt-1">
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    {/* १. ✏️ Edit Form Button */}
                    <button
                      onClick={() => router.push(`/dashboard/forms/${form.id}`)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-[11px] font-bold text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer border border-transparent dark:border-zinc-800 shrink-0"
                    >
                      <Pencil className="h-3 w-3" /> Edit
                    </button>

                    {/* २. 🚀 View Live Button */}
                    <button
                      onClick={() => window.open(`/p/${form.id}`, "_blank")}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer shrink-0"
                    >
                      <ExternalLink className="h-3 w-3" /> Live
                    </button>

                    {/* ३. 📋 Copy Link Button */}
                    <button
                      onClick={(e) => handleCopyLink(e, form.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer truncate shrink-0 ${
                        copiedFormId === form.id
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                          : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {copiedFormId === form.id ? (
                        <>
                          <Check className="h-3 w-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Link
                        </>
                      )}
                    </button>
                  </div>

                  {/* ४. 🗑️ Delete Button */}
                  <button
                    onClick={() => setFormToDelete(form.id)}
                    className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer shrink-0"
                    title="Delete Form"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {formToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md transition-all duration-300 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] p-6 shadow-2xl text-center">
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
