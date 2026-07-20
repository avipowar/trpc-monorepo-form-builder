"use client";

import { ArrowLeft } from "lucide-react";

interface BuilderNavbarProps {
  formId: string;
  onBack: () => void;
}

export function BuilderNavbar({ formId, onBack }: BuilderNavbarProps) {
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
    </header>
  );
}
