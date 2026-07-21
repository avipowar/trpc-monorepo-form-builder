"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useListForms, useCreateForm, useDeleteForm } from "~/hooks/api/form";
import {
  Plus,
  Search,
  Loader2,
  FileText,
  Trash2,
  ExternalLink,
  Edit3,
  Link2,
  X,
  Inbox,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Copy,
} from "lucide-react";

export default function FormsPage() {
  const router = useRouter();
  const { forms = [], isLoading } = useListForms();
  const { createFormAsync, isPending: isCreating } = useCreateForm();
  const { deleteFormAsync } = useDeleteForm();

  // 🎯 Create Form Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🎯 Delete Form Custom Modal State
  const [deleteFormId, setDeleteFormId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 🎯 Copy Link Custom Modal State
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");

  const handleCreateForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newForm = await createFormAsync({
        title: title.trim(),
        description: description.trim(),
      } as any);

      setIsModalOpen(false);
      setTitle("");
      setDescription("");

      if (newForm?.id) {
        router.push(`/dashboard/forms/${newForm.id}`);
      }
    } catch (error) {
      console.error("Failed to create form:", error);
    }
  };

  const handleCopyLink = (formId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/p/${formId}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
  };

  const promptDeleteForm = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteFormId(id);
  };

  const confirmDeleteForm = async () => {
    if (!deleteFormId) return;

    setIsDeleting(true);
    try {
      await deleteFormAsync({ id: deleteFormId } as any);
      setDeleteFormId(null);
    } catch (error) {
      console.error("Failed to delete form:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredForms = forms.filter((form: any) => {
    const matchesSearch = form.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "ALL" ? true : form.status?.toUpperCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] w-full flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 p-4">
        <Loader2 className="h-8 w-8 animate-spin mb-3 text-emerald-500" />
        <p className="text-xs font-semibold tracking-wide uppercase">Loading your forms... ☕</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 pb-24 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              My Forms
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Create, manage, and analyze your forms in one place.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 px-5 py-2.5 text-xs font-bold transition-all cursor-pointer shadow-md shrink-0"
          >
            <Plus className="h-4 w-4" /> Create New Form
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900/80 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 w-full sm:w-auto">
            {(["ALL", "PUBLISHED", "DRAFT"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === status
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Search forms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
            />
          </div>
        </div>

        {filteredForms.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-12 text-center space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mx-auto">
              <FileText className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                No forms found
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Click "Create New Form" above to get started! 🚀
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredForms.map((form: any) => {
              const formattedDate = form.createdAt
                ? new Date(form.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Jul 21, 2026";

              return (
                <div
                  key={form.id}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm dark:shadow-xl space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 flex flex-col justify-between"
                >
                  {/* Card Top */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <FileText className="h-5 w-5 text-zinc-600 dark:text-zinc-300 shrink-0" />
                        <h3 className="font-extrabold text-xl text-zinc-900 dark:text-zinc-50 truncate max-w-[180px]">
                          {form.title || "Untitled Form"}
                        </h3>
                      </div>

                      <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-700/80 shrink-0">
                        {form.status || "DRAFT"}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 min-h-[32px]">
                      {form.description || "No description provided"}
                    </p>
                  </div>

                  {/* Submissions Count & Date */}
                  <div className="flex items-center justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                    <div className="flex items-center gap-1.5">
                      <Inbox className="h-4 w-4 text-zinc-400" />
                      <span>{form.submissionsCount || 0} Submissions</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-zinc-400" />
                      <span>{formattedDate}</span>
                    </div>
                  </div>

                  {/* 🎯 Action Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push(`/dashboard/forms/${form.id}`)}
                        className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 text-xs font-bold flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-700/80 transition-all cursor-pointer"
                      >
                        <Edit3 className="h-3.5 w-3.5" /> Edit
                      </button>

                      <button
                        onClick={() => window.open(`/p/${form.id}`, "_blank")}
                        className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 text-xs font-bold flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-700/80 transition-all cursor-pointer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Live
                      </button>

                      <button
                        onClick={(e) => handleCopyLink(form.id, e)}
                        className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 text-xs font-bold flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-700/80 transition-all cursor-pointer"
                      >
                        <Link2 className="h-3.5 w-3.5" /> Link
                      </button>
                    </div>

                    <button
                      onClick={(e) => promptDeleteForm(form.id, e)}
                      className="p-2 rounded-xl text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Delete Form"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 🟢 CREATE FORM POPUP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Create New Form</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateForm} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  Form Title <span className="text-emerald-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. User Feedback Form"
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  Description <span className="text-zinc-400 dark:text-zinc-500">(Optional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description about this form..."
                  rows={3}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || !title.trim()}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 transition-all cursor-pointer shadow-md flex items-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Creating...
                    </>
                  ) : (
                    "Create Form"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔴 CUSTOM DELETE CONFIRMATION MODAL */}
      {deleteFormId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200 text-center">
            <div className="h-12 w-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mx-auto">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Delete Form?</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
                Are you sure you want to delete this form? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
              <button
                type="button"
                onClick={() => setDeleteFormId(null)}
                className="w-1/2 py-2.5 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteForm}
                disabled={isDeleting}
                className="w-1/2 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 disabled:opacity-50 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Deleting...
                  </>
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🟢 CUSTOM COPY LINK MODAL */}
      {copiedLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200 text-center">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Link Copied!</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                The form share link has been copied to your clipboard.
              </p>
            </div>

            <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
              <span className="truncate select-all text-left">{copiedLink}</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(copiedLink);
                  setCopiedLink(null);
                }}
                className="p-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer shrink-0"
                title="Copy and close"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setCopiedLink(null)}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white transition-all cursor-pointer shadow-md"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
