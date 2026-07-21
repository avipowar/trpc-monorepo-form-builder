"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "~/hooks/api/auth";
import { LayoutDashboard, FileText, Inbox, Settings as SettingsIcon } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Forms", href: "/dashboard/forms", icon: FileText },
    { name: "Submissions", href: "/dashboard/submissions", icon: Inbox },
    { name: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      <aside className="w-64 fixed inset-y-0 left-0 z-45 flex flex-col justify-between border-r border-zinc-800 bg-zinc-950 p-6 select-none">
        {/* Logo / Brand */}
        <div className="space-y-8">
          <div className="flex items-center gap-2 px-2">
            <span className="font-extrabold text-xl tracking-tight text-white">ChaiForms</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-zinc-800 text-white shadow-sm"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-zinc-400"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile Card at Bottom */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3.5 space-y-1">
          <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
            Logged in as
          </div>
          <div className="text-xs font-bold text-zinc-200 truncate">
            {user?.fullName || user?.email || "User"}
          </div>
        </div>
      </aside>

      <main className="flex-1 pl-64 min-h-screen bg-zinc-950">{children}</main>
    </div>
  );
}
