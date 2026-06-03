"use client";

import Link from "next/link";

import { useListForms } from "../../../hooks/api/form";

import { CreateFormDialog } from "~/components/forms/create-form-dialog";

export default function FormsPage() {
  const { forms, isLoading } = useListForms();

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Forms</h1>

          <p className="text-muted-foreground">Create and manage your forms</p>
        </div>

        <CreateFormDialog />
      </div>

      {isLoading ? (
        <div className="rounded-lg border p-6">Loading forms...</div>
      ) : forms.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-xl border">
          <div className="text-center">
            <h2 className="text-xl font-semibold">No forms yet</h2>

            <p className="mt-2 text-muted-foreground">Create your first form to get started.</p>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border">
          {/* Table Header */}
          <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-3 text-sm font-semibold">
            <div className="col-span-3">Title</div>
            <div className="col-span-5">Description</div>
            <div className="col-span-2">Created</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {/* Table Rows */}
          {forms.map((form) => (
            <div
              key={form.id}
              className="grid grid-cols-12 items-center border-b px-4 py-4 hover:bg-muted/30"
            >
              <div className="col-span-3 font-medium truncate">{form.title}</div>

              <div className="col-span-5 truncate text-sm text-muted-foreground">
                {form.description || "No description"}
              </div>

              <div className="col-span-2 text-sm text-muted-foreground">
                {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : "-"}
              </div>

              <div className="col-span-2 flex justify-end">
                <Link href={`/dashboard/forms/${form.id}`}>
                  <button className="rounded-md border px-3 py-1 text-sm font-medium hover:bg-muted">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
