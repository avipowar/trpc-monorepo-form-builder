"use client";

import { useParams, useRouter } from "next/navigation";
import { BuilderNavbar } from "~/components/form-builder/builder-navbar";
import { BuilderSidebar } from "~/components/form-builder/builder-sidebar";
import { BuilderCanvas } from "~/components/form-builder/builder-canvas";
import { useCreateField, useGetFields, useDeleteField, useUpdateField } from "~/hooks/api/form";
import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";

type FieldType = "TEXT" | "NUMBER" | "EMAIL" | "PASSWORD" | "YES_NO";

export default function FormBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const formId = params.formId as string;

  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const [localLabel, setLocalLabel] = useState("");
  const [localPlaceholder, setLocalPlaceholder] = useState("");
  const [localIsRequired, setLocalIsRequired] = useState(false);

  // tRPC Real-time API Hooks
  const { fields: dbFields, isLoading } = useGetFields(formId);
  const selectedField = dbFields?.find((f) => f.id === selectedFieldId);

  const { createFieldAsync } = useCreateField(formId);
  const { deleteFieldAsync } = useDeleteField(formId);
  const { updateFieldAsync } = useUpdateField(formId);

  // Sync database values with local states
  useEffect(() => {
    if (selectedField) {
      setLocalLabel(selectedField.label);
      setLocalPlaceholder(selectedField.placeholder || "");
      setLocalIsRequired(selectedField.isRequired);
    }
  }, [selectedFieldId, selectedField]);

  // Add Field directly to DB
  const addField = async (type: FieldType) => {
    const defaultData = {
      TEXT: { label: "Full Name", placeholder: "Avinash Powar" },
      NUMBER: { label: "Age / Phone", placeholder: "24" },
      EMAIL: { label: "Email Address", placeholder: "avinash@example.com" },
      PASSWORD: { label: "Password", placeholder: "••••••••" },
      YES_NO: { label: "I agree to the terms and conditions", placeholder: "" },
    }[type];

    try {
      await createFieldAsync({
        formId,
        type,
        label: defaultData.label,
        placeholder: defaultData.placeholder,
      });
    } catch (err) {
      console.error("Error saving field:", err);
    }
  };

  // Delete Field directly from DB
  const removeField = async (id: string) => {
    try {
      await deleteFieldAsync({ fieldId: id });
      if (selectedFieldId === id) {
        setSelectedFieldId(null);
        setIsEditModalOpen(false);
      }
    } catch (err) {
      console.error("Error deleting field:", err);
    }
  };

  // Save updated inputs from modal into the DB
  const saveFieldChanges = async () => {
    if (!selectedFieldId) return;
    try {
      await updateFieldAsync({
        fieldId: selectedFieldId,
        label: localLabel,
        placeholder: localPlaceholder,
        isRequired: localIsRequired,
      });
      setIsEditModalOpen(false);
      console.log("Field updated successfully in DB!");
    } catch (err) {
      console.error("Error updating field:", err);
    }
  };

  const handleSaveConfiguration = () => {
    setIsSaveModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-sm font-medium">
        Loading builder...
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 overflow-hidden transition-colors duration-200">
      <BuilderNavbar
        formId={formId}
        onBack={() => router.push("/dashboard")}
        onSave={handleSaveConfiguration}
      />

      <div className="flex-1 flex h-[calc(100vh-64px)] w-full overflow-hidden">
        <BuilderSidebar onAddField={addField} />

        <BuilderCanvas
          fields={dbFields || []}
          onRemoveField={removeField}
          onSelectField={(id) => {
            setSelectedFieldId(id);
            setIsEditModalOpen(true);
          }}
          selectedFieldId={selectedFieldId}
        />
      </div>

      {/* Fullscreen Backdrop Blur Modal Overlay */}
      {isEditModalOpen && selectedField && (
        <div className="fixed inset-0 w-screen h-screen bg-zinc-950/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 flex flex-col space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800/60">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Field Properties
                </h3>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                  Type: {selectedField.type}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Field Label Name
                </label>
                <input
                  type="text"
                  value={localLabel}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent p-2.5 text-sm text-zinc-950 dark:text-zinc-50 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
                  onChange={(e) => setLocalLabel(e.target.value)}
                />
              </div>

              {selectedField.type !== "YES_NO" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Placeholder Text
                  </label>
                  <input
                    type="text"
                    value={localPlaceholder}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent p-2.5 text-sm text-zinc-950 dark:text-zinc-50 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
                    onChange={(e) => setLocalPlaceholder(e.target.value)}
                  />
                </div>
              )}

              <div className="flex items-center justify-between py-2 px-1 bg-transparent">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Required Field
                </span>
                <input
                  type="checkbox"
                  checked={localIsRequired}
                  onChange={(e) => setLocalIsRequired(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-700 h-4 w-4 bg-transparent text-blue-500 focus:ring-blue-500/20 cursor-pointer accent-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveFieldChanges}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-blue-500 bg-transparent border border-blue-500/40 hover:border-blue-500 hover:bg-blue-500/5 transition-all cursor-pointer shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {isSaveModalOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-zinc-950/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 flex flex-col items-center text-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 animate-in zoom-in duration-200">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                Configuration Saved!
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Your form configuration has been successfully synchronized with the database.
              </p>
            </div>

            <div className="flex gap-3 w-full pt-2">
              <button
                type="button"
                onClick={() => setIsSaveModalOpen(false)}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 cursor-pointer transition-all"
              >
                Keep Editing
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsSaveModalOpen(false);
                  router.push("/dashboard");
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/40 hover:border-emerald-500 bg-transparent px-4 py-2.5 text-xs font-semibold text-emerald-500 hover:bg-emerald-500/5 cursor-pointer shadow-sm active:scale-95 transition-all"
              >
                Dashboard <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
