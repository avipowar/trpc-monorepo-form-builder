"use client";

import { User, Hash, Mail, Lock, Trash2, Pencil, Phone, Save, Rocket } from "lucide-react";

type FieldType = "TEXT" | "NUMBER" | "EMAIL" | "PASSWORD" | "YES_NO";

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
  onSelectField: (id: string) => void;
  selectedFieldId: string | null;
  onSave: () => void;
  onPublish: () => void;
}

export function BuilderCanvas({
  fields,
  onRemoveField,
  onSelectField,
  selectedFieldId,
  onSave,
  onPublish,
}: BuilderCanvasProps) {
  const getFieldIcon = (type: FieldType, label: string) => {
    const iconClass = "absolute left-4 top-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-600";

    if (label.toUpperCase().includes("PHONE")) {
      return <Phone className={iconClass} />;
    }

    switch (type) {
      case "TEXT":
        return <User className={iconClass} />;
      case "NUMBER":
        return <Hash className={iconClass} />;
      case "EMAIL":
        return <Mail className={iconClass} />;
      case "PASSWORD":
        return <Lock className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 bg-zinc-50 dark:bg-[#09090b] p-12 overflow-y-auto flex justify-center items-start relative">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] p-8 shadow-xl h-auto flex flex-col mt-6">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Live Preview Form
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Click edit icon to change field settings
          </p>
        </div>

        {fields.length === 0 ? (
          <div className="py-24 text-center text-zinc-400 dark:text-zinc-500 text-xs font-semibold border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/20 tracking-wide">
            -- No Fields Available Yet --
          </div>
        ) : (
          <div className="space-y-5 flex-1">
            {fields.map((field) => {
              return (
                <div
                  key={field.id}
                  className="space-y-2 relative group p-2 rounded-xl transition-all"
                >
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                      {field.label}
                    </label>

                    <div className="flex items-center gap-0.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-0.5 shadow-sm">
                      <button
                        type="button"
                        onClick={() => onSelectField(field.id)}
                        className="p-1.5 rounded-md text-zinc-400 hover:text-blue-500 hover:bg-white dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <div className="w-[1px] h-3 bg-zinc-200 dark:bg-zinc-800" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveField(field.id);
                        }}
                        className="p-1.5 rounded-md text-zinc-400 hover:text-red-500 hover:bg-white dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {field.type !== "YES_NO" ? (
                    <div className="relative pointer-events-none">
                      {getFieldIcon(field.type, field.label)}
                      <input
                        type={field.type === "PASSWORD" ? "password" : "text"}
                        disabled
                        placeholder={field.placeholder ?? undefined}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-3 pl-11 pr-4 text-sm text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none shadow-sm"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 py-1 px-1 pointer-events-none">
                      <input
                        type="checkbox"
                        disabled
                        className="rounded-md border-zinc-200 dark:border-zinc-800 h-4 w-4 bg-zinc-50 dark:bg-zinc-950 text-zinc-900"
                      />
                      <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                        Consent option checkbox setup
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="space-y-3 w-full pt-4 mt-6">
              {/* 💾 १. Save Configuration Button */}
              <button
                type="button"
                onClick={onSave}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800/80 py-3 text-sm font-bold shadow-sm transition-all active:scale-[0.99] cursor-pointer"
              >
                <Save className="h-4 w-4" /> Save Configuration
              </button>

              {/* 🚀 २. Publish Live Button */}
              <button
                type="button"
                onClick={onPublish}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white py-3 text-sm font-extrabold shadow-md shadow-emerald-900/10 transition-all active:scale-[0.99] cursor-pointer select-none"
              >
                <Rocket className="h-4 w-4 animate-pulse" /> Publish Live Form
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
