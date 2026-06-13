"use client";

import { LayoutDashboard, FileText, Settings } from "lucide-react";

interface SidebarProps {
  user: {
    fullName?: string | null;
  } | null;
}

export function Sidebar({ user }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-border bg-card/30 p-6 flex flex-col justify-between hidden md:flex">
      <div className="space-y-8">
        <div className="text-xl font-bold tracking-wider text-primary">ChaiForms</div>
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
        <p className="text-sm font-medium truncate">{user?.fullName || "Avinash Powar"}</p>
      </div>
    </aside>
  );
}
