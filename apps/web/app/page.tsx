"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function RootPage() {
  const router = useRouter();

  const isLoading = false;
  const isAuthenticated = false;

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center text-zinc-400">
      <Loader2 className="h-7 w-7 animate-spin text-emerald-500 mb-3" />
      <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 select-none">
        Verifying Session...
      </p>
    </div>
  );
}
