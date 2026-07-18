"use client";

import { User, Hash, Mail, Lock, CheckSquare, Plus, Phone } from "lucide-react";

type FieldType = "TEXT" | "NUMBER" | "EMAIL" | "PASSWORD" | "YES_NO";

type SidebarFieldType = "TEXT" | "AGE" | "PHONE" | "EMAIL" | "PASSWORD" | "YES_NO";

interface BuilderSidebarProps {
  onAddField: (type: any) => void;
}

export function BuilderSidebar({ onAddField }: BuilderSidebarProps) {
  const getSidebarIcon = (type: SidebarFieldType) => {
    switch (type) {
      case "TEXT":
        return <User className="h-4 w-4" />;
      case "AGE":
        return <Hash className="h-4 w-4" />;
      case "PHONE":
        return <Phone className="h-4 w-4" />;
      case "EMAIL":
        return <Mail className="h-4 w-4" />;
      case "PASSWORD":
        return <Lock className="h-4 w-4" />;
      case "YES_NO":
        return <CheckSquare className="h-4 w-4" />;
    }
  };

  return (
    <aside className="w-72 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] p-5 flex flex-col justify-between shrink-0 overflow-y-auto">
      <div className="space-y-4">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">
          Form Components
        </h2>
        <div className="space-y-1.5">
          {/* 🎯 या अरे (Array) मधून आपण "NUMBER" पूर्णपणे उडवला आहे */}
          {(["TEXT", "AGE", "PHONE", "EMAIL", "PASSWORD", "YES_NO"] as SidebarFieldType[]).map(
            (type) => (
              <button
                key={type}
                onClick={() => onAddField(type)}
                className="w-full flex items-center justify-between p-3 text-xs font-semibold border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer transition-all hover:translate-x-1 group text-zinc-700 dark:text-zinc-300 active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-950 dark:group-hover:text-zinc-50 transition-colors">
                    {getSidebarIcon(type)}
                  </div>
                  <span className="capitalize">{type.toLowerCase().replace("_", " ")}</span>
                </div>
                <Plus className="h-3.5 w-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ),
          )}
        </div>
      </div>
    </aside>
  );
}
