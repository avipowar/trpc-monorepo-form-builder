"use client";

import { ArrowLeft, Save } from "lucide-react";

interface BuilderNavbarProps {
  formId: string;
  onBack: () => void;
  onSave: () => void;
}

export function BuilderNavbar({ formId, onBack, onSave }: BuilderNavbarProps) {
  return (
    <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] px-6 flex items-center justify-between shrink-0 z-50 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] cursor-pointer transition-all active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </button>
        <div>
          <h1 className="text-sm font-bold tracking-tight">Form Workspace</h1>
          <p className="text-[10px] text-zinc-400 font-mono mt-0.5">ID: {formId}</p>
        </div>
      </div>

      <button
        onClick={onSave}
        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-md active:scale-95 transition-all"
      >
        <Save className="h-3.5 w-3.5" /> Save Configuration
      </button>
    </header>
  );
}
