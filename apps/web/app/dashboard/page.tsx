"use client";

import { useState } from "react";
import {
  Plus,
  Filter,
  LayoutDashboard,
  FileText,
  Settings,
  CreditCard,
  Search,
} from "lucide-react";

const MOCK_FORMS = [
  {
    id: "1",
    title: "VIP Creator Application 🔒",
    status: "published",
    responses: 382,
    updated: "Updated 5/23/2026",
  },
  {
    id: "2",
    title: "Solar Vibes Music Poll ☀️",
    status: "published",
    responses: 302,
    updated: "Updated 5/24/2026",
  },
  {
    id: "3",
    title: "Dev Tools Feedback 🛠️",
    status: "draft",
    responses: 0,
    updated: "Updated 6/01/2026",
  },
  {
    id: "4",
    title: "Startup Onboarding Form",
    status: "published",
    responses: 262,
    updated: "Updated 5/25/2026",
  },
];

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredForms = MOCK_FORMS.filter((form) => {
    if (activeFilter === "all") return true;
    return form.status === activeFilter;
  });

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="w-64 border-r border-border bg-card/30 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          <div className="text-xl font-bold tracking-wider text-primary">TokyoForms</div>
          <nav className="space-y-2">
            <button className="flex w-full items-center gap-3 rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-foreground">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all">
              <FileText className="h-4 w-4" /> My Forms
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all">
              <Settings className="h-4 w-4" /> Settings
            </button>
          </nav>
        </div>
        <div className="rounded-xl bg-secondary/40 p-4 border border-border/60">
          <p className="text-xs text-muted-foreground">Logged in as</p>
          <p className="text-sm font-medium truncate">Avinash Powar</p>
        </div>
      </aside>

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
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg hover:scale-105 transition-all">
            <Plus className="h-4 w-4" /> Create New Form
          </button>
        </div>

        {/* ३. ADVANCED FILTER BAR */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex gap-2 rounded-xl bg-secondary/50 p-1.5 border border-border/40">
            {["all", "published", "draft"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeFilter === tab
                    ? "bg-card text-foreground shadow-sm border border-border/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "all" ? "All Forms" : tab}
              </button>
            ))}
          </div>

          {/* Fake Search input for visual completeness */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search forms..."
              className="w-full rounded-xl border border-border bg-card/50 py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* ४. FORMS GRID (CARDS) */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredForms.map((form) => (
            <div
              key={form.id}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:scale-[1.02] hover:shadow-lg dark:hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    form.status === "published"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-amber-500/10 text-amber-500"
                  }`}
                >
                  {form.status}
                </span>
                <span className="text-xs text-muted-foreground font-mono">{form.updated}</span>
              </div>
              <h3 className="mt-4 font-semibold text-lg tracking-tight group-hover:text-primary transition-colors">
                {form.title}
              </h3>
              <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
                <span>Responses</span>
                <span className="font-bold text-foreground text-sm font-mono">
                  {form.responses}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
