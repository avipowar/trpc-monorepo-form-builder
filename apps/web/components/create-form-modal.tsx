"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useCreateForm } from "../hooks/api/form";

interface CreateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateFormModal({ isOpen, onClose }: CreateFormModalProps) {
  const { theme } = useTheme();
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const { createFormAsync, status, error: createFormError } = useCreateForm();

  if (!isOpen) return null;

  return (
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

        <div className="space-y-4">
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

          {createFormError && (
            <div className="text-xs font-semibold text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mt-2">
              {createFormError.message}
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800/60 pt-4">
          <button
            onClick={() => {
              onClose();
              setFormTitle("");
              setFormDescription("");
            }}
            className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-5 py-2.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-50 cursor-pointer transition-all duration-300"
          >
            Cancel
          </button>

          <button
            disabled={!formTitle.trim() || status === "pending"}
            onClick={async () => {
              try {
                await createFormAsync({
                  title: formTitle,
                  description: formDescription.trim() || undefined,
                });
                onClose();
                setFormTitle("");
                setFormDescription("");
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
  );
}