"use client";

import { Search } from "lucide-react";

interface FilterBarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export function FilterBar({ activeFilter, setActiveFilter }: FilterBarProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex gap-2 rounded-xl bg-secondary/50 p-1.5 border border-border/40">
        {["all", "published", "draft"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeFilter === tab
                ? "bg-card text-foreground shadow-sm border border-border/40"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "all" ? "All Forms" : tab}
          </button>
        ))}
      </div>

      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search forms..."
          className="w-full rounded-xl border border-border bg-card/50 py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    </div>
  );
}
