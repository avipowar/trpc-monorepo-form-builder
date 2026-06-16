"use client";

import { User, Hash, Mail, Lock, Trash2 } from "lucide-react";

type FieldType = "TEXT" | "NUMBER" | "EMAIL" | "PASSWORD" | "YES_NO";

// 👑 Updated to perfectly match DB types and page.tsx interface without using 'any'
interface FormField {
  id: string;
  label: string;
  labelKey: string;
  placeholder?: string | null;
  isRequired: boolean;
  index: number | string;
  type: FieldType;
  description?: string | null;
}

interface BuilderCanvasProps {
  fields: FormField[];
  onRemoveField: (id: string) => void;
}

export function BuilderCanvas({ fields, onRemoveField }: BuilderCanvasProps) {
  const getFieldIcon = (type: FieldType) => {
    switch (type) {
      case "TEXT":
        return (
          <User className="absolute left-4 top-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-600" />
        );
      case "NUMBER":
        return (
          <Hash className="absolute left-4 top-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-600" />
        );
      case "EMAIL":
        return (
          <Mail className="absolute left-4 top-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-600" />
        );
      case "PASSWORD":
        return (
          <Lock className="absolute left-4 top-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-600" />
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 bg-zinc-100/40 dark:bg-[#09090b] p-10 overflow-y-auto flex justify-center items-start">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] p-8 shadow-xl transition-all h-auto flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Live Preview Form
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Click items on the left panel to populate fields. ☕
          </p>
        </div>

        {fields.length === 0 ? (
          <div className="py-24 text-center text-zinc-400 dark:text-zinc-500 text-xs font-semibold border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/20 tracking-wide">
            -- No Fields Available Yet --
          </div>
        ) : (
          <div className="space-y-5 flex-1">
            {fields.map((field) => (
              <div key={field.id} className="space-y-2 relative group transition-all duration-150">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                    {field.label}
                  </label>
                  <button
                    type="button"
                    onClick={() => onRemoveField(field.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-red-500 transition-opacity rounded cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {field.type !== "YES_NO" ? (
                  <div className="relative">
                    {getFieldIcon(field.type)}
                    <input
                      type={field.type === "PASSWORD" ? "password" : "text"}
                      disabled
                      placeholder={field.placeholder ?? undefined} // Safe fall-through from null to undefined for HTML inputs
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-3 pl-11 pr-4 text-sm text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none cursor-not-allowed shadow-sm"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 py-1 px-1">
                    <input
                      type="checkbox"
                      disabled
                      className="rounded-md border-zinc-200 dark:border-zinc-800 h-4 w-4 bg-zinc-50 dark:bg-zinc-950 cursor-not-allowed text-zinc-900"
                    />
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                      Consent option checkbox setup
                    </span>
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              disabled
              className="w-full mt-6 flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-50 py-3 text-sm font-semibold text-zinc-50 dark:text-zinc-900 opacity-40 cursor-not-allowed shadow-md"
            >
              Submit Form
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
