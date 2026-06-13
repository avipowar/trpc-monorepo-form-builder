"use client";

import { SignupForm } from "~/components/signup-form";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <SignupForm />
    </div>
  );
}
