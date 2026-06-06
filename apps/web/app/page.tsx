"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";
import { ThemeToggle } from "../components/theme-toggle";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center bg-background text-foreground">
      {/* 1. Cyberpunk Grid Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e1e4ea_1px,transparent_1px),linear-gradient(to_bottom,#e1e4ea_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2335_1px,transparent_1px),linear-gradient(to_bottom,#1f2335_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10 dark:opacity-10" />

      {/* 2. Top Glowing Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/50 px-4 py-1.5 text-sm text-primary shadow-sm dark:shadow-neon-sakura backdrop-blur-md">
        <Sparkles className="h-4 w-4 text-primary dark:text-accent-foreground animate-pulse" />
        <span className="font-mono tracking-wider uppercase">Next-Gen Typeform Clone</span>
      </div>

      {/* 3. Main Hero Heading */}
      <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl text-foreground">
        Build Forms at{" "}
        <span className="bg-gradient-to-r from-[#9d7cd8] to-[#0284c7] dark:from-[#bb9af7] dark:to-[#73daca] bg-clip-text text-transparent inline-block pb-3 pr-2 mr-[-8px]">
          The Speed of Thought
        </span>
      </h1>

      {/* 4. Subtitle Description */}
      <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-muted-foreground sm:text-xl">
        Experience a futuristic, keyboard-first form builder. Crafted with Tokyo Night aesthetics
        for modern developers.
      </p>

      {/* 5. Call To Action Buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/dashboard"
          className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-md dark:hover:shadow-neon-sakura"
        >
          Get Started Free
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-6 py-3 font-semibold text-foreground backdrop-blur-md transition-all hover:bg-secondary">
          <Terminal className="h-4 w-4" />
          View Docs
        </button>
      </div>

      {/* 6. Floating Theme Toggle */}
      <ThemeToggle />
    </main>
  );
}
