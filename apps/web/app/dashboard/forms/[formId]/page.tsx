"use client";

import { useParams, useRouter } from "next/navigation";
import { BuilderNavbar } from "~/components/form-builder/builder-navbar";
import { BuilderSidebar } from "~/components/form-builder/builder-sidebar";
import { BuilderCanvas } from "~/components/form-builder/builder-canvas";
import { useCreateField, useGetFields, useDeleteField } from "~/hooks/api/form";

type FieldType = "TEXT" | "NUMBER" | "EMAIL" | "PASSWORD" | "YES_NO";

export default function FormBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const formId = params.formId as string;

  // 🔌 tRPC Real-time API Hooks
  const { fields: dbFields, isLoading } = useGetFields(formId);
  const { createFieldAsync } = useCreateField(formId);
  const { deleteFieldAsync } = useDeleteField(formId);

  // ➕ Add Field directly to DB
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

  // 🗑️ Delete Field directly from DB
  const removeField = async (id: string) => {
    try {
      await deleteFieldAsync({ fieldId: id });
    } catch (err) {
      console.error("Error deleting field:", err);
    }
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
      <BuilderNavbar formId={formId} onBack={() => router.push("/dashboard")} />

      <div className="flex-1 flex h-[calc(100vh-64px)] w-full overflow-hidden">
        <BuilderSidebar onAddField={addField} />
        <BuilderCanvas fields={dbFields || []} onRemoveField={removeField} />
      </div>
    </div>
  );
}
