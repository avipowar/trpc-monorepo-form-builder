"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCreateForm, useListForms, useDeleteForm } from "../../hooks/api/form";
import { CreateFormModal } from "~/components/create-form-modal";
import { useUser } from "../../hooks/api/auth";
import { Plus, LayoutDashboard, FileText, Settings, Search } from "lucide-react";
import { DashboardSkeleton } from "~/components/dashboard-skeleton";
import { Sidebar } from "~/components/sidebar";
import { FilterBar } from "~/components/filter-bar";
import { FormGrid } from "~/components/form-grid";

export default function DashboardPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Real Hooks Integration
  const { user, isLoading: isUserLoading } = useUser();
  const { forms, isLoading: isFormsLoading } = useListForms();
  const { deleteFormAsync } = useDeleteForm();

  const handleDeleteForm = async (id: string) => {
    try {
      await deleteFormAsync({ id });
    } catch (error) {
      console.error("Failed to delete form:", error);
    }
  };

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return null;
  }

  const filteredForms = (forms || []).filter((form) => {
    if (activeFilter === "all") return true;

    const formStatus = form.status?.toLowerCase() || "draft";
    return formStatus === activeFilter.toLowerCase();
  });

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* १. SIDEBAR SECTION */}
      <Sidebar user={user} />

      {/* २. MAIN CONTENT AREA */}
      <main className="flex-1 p-8 md:p-12">
        {/* TOP HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-border/60">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Forms</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Create, manage, and analyze your forms in one place.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Create New Form
          </button>
        </div>

        {/* ३. ADVANCED FILTER BAR */}
        <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        {/* ४. DYNAMIC FORMS GRID SECTION */}
        <FormGrid forms={filteredForms} isLoading={isFormsLoading} onDelete={handleDeleteForm} />

        {/* ५. MODERN MINIMALIST MODAL */}
        <CreateFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>
    </div>
  );
}
