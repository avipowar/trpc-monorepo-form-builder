"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "~/hooks/api/auth";
import { LayoutDashboard, FileText, Inbox, Settings, Loader2 } from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Forms", href: "/dashboard/forms", icon: FileText },
  { label: "Submissions", href: "/dashboard/submissions", icon: Inbox },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading } = useUser();

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* 🟢 SIDEBAR (Sticky + Dynamic Light/Dark Theme) */}
      <aside className="w-64 h-screen sticky top-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between shrink-0 hidden md:flex transition-colors duration-300 z-40">
        <div className="space-y-8">
          {/* LOGO */}
          <div className="px-2">
            <Link
              href="/dashboard"
              className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2"
            >
              ChaiForms
            </Link>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-bold border border-zinc-200 dark:border-zinc-700 shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-500"}`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 📌 LOGGED IN USER PROFILE  */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
          <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="space-y-0.5 overflow-hidden">
              <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Logged in as
              </p>
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">
                {isLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin text-emerald-500" />
                ) : (
                  user?.fullName || "Test 1"
                )}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* 🟢 MAIN CONTENT */}
      <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
    </div>
  );
}
