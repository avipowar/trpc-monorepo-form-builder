"use client";

export function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen bg-background text-foreground w-full">
      <aside className="w-64 border-r border-border bg-card/30 p-6 flex flex-col justify-between hidden md:flex animate-pulse">
        <div className="space-y-8">
          <div className="h-6 w-32 bg-secondary rounded-xl" />
          <div className="space-y-3">
            <div className="h-10 w-full bg-secondary rounded-xl" />
            <div className="h-10 w-full bg-secondary/50 rounded-xl" />
            <div className="h-10 w-full bg-secondary/50 rounded-xl" />
          </div>
        </div>
        <div className="h-16 w-full bg-secondary/40 rounded-xl border border-border/60" />
      </aside>

      <main className="flex-1 p-8 md:p-12 animate-pulse w-full">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-border/60">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-secondary rounded-xl" />
            <div className="h-4 w-80 bg-secondary/60 rounded-xl" />
          </div>
          <div className="h-10 w-36 bg-secondary rounded-xl" />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="h-10 w-64 bg-secondary/50 rounded-xl" />
          <div className="h-10 w-full sm:w-64 bg-secondary/50 rounded-xl" />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-4 w-12 bg-secondary rounded-full" />
                <div className="h-4 w-16 bg-secondary rounded-xl" />
              </div>
              <div className="h-6 w-3/4 bg-secondary rounded-xl" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-secondary/60 rounded-xl" />
                <div className="h-4 w-5/6 bg-secondary/60 rounded-xl" />
              </div>
              <div className="border-t border-border/40 pt-4 flex justify-between">
                <div className="h-4 w-16 bg-secondary/60 rounded-xl" />
                <div className="h-4 w-6 bg-secondary rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
