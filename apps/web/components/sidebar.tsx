"use client";

import { LayoutDashboard, FileText, Settings, Inbox } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
  user: {
    fullName?: string | null;
  } | null;
}

export function Sidebar({ user }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getTabClass = (path: string) => {
    const baseClass =
      "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all cursor-pointer";
    if (pathname === path) {
      return `${baseClass} bg-secondary text-foreground`;
    }
    return `${baseClass} text-muted-foreground hover:bg-secondary/50 hover:text-foreground`;
  };

  return (
    <aside className="w-64 border-r border-border bg-card/30 p-6 flex flex-col justify-between hidden md:flex">
      <div className="space-y-8">
        <div className="text-xl font-bold tracking-wider text-primary">ChaiForms</div>
        <nav className="space-y-2">
          <button onClick={() => router.push("/dashboard")} className={getTabClass("/dashboard")}>
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all">
            <FileText className="h-4 w-4" /> My Forms
          </button>

          <button
            onClick={() => router.push("/dashboard/submissions")}
            className={getTabClass("/dashboard/submissions")}
          >
            <Inbox className="h-4 w-4" /> Submissions
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
