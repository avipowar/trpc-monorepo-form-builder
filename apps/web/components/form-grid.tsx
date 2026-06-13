"use client";

interface Form {
  id: string;
  title: string;
  description?: string | null;
  createdAt: string | null;
}

interface FormGridProps {
  forms: Form[];
  isLoading: boolean;
}

export function FormGrid({ forms, isLoading }: FormGridProps) {
  return (
    <>
      {isLoading ? (
        <div className="mt-12 text-center text-sm text-muted-foreground animate-pulse">
          Loading your premium forms... ☕
        </div>
      ) : forms.length === 0 ? (
        <div className="mt-12 text-center text-sm text-muted-foreground border border-dashed border-border rounded-2xl p-12">
          No forms found. Click "Create New Form" to get started! 🚀
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <div
              key={form.id}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:scale-[1.02] hover:shadow-lg dark:hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-500">
                  Draft
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : "Just now"}
                </span>
              </div>
              <h3 className="mt-4 font-semibold text-lg tracking-tight group-hover:text-primary transition-colors truncate">
                {form.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 h-8">
                {form.description || "No description provided."}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
                <span>Submissions</span>
                <span className="font-bold text-foreground text-sm font-mono">0</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
