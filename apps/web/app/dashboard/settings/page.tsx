"use client";

import { useState, useEffect } from "react";
import { useUser, useUpdateUser } from "~/hooks/api/auth"; // 👈 नवीन useUpdateUser इंपोर्ट केला
import { User, Mail, Shield, Moon, Bell, Loader2, Save, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const { user, isLoading } = useUser();
  const { updateUserAsync } = useUpdateUser(); // 👈 tRPC म्युटेशन हुक

  const [fullName, setFullName] = useState("");
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user?.fullName) {
      setFullName(user.fullName);
    }
  }, [user]);

  // 💾 रिअल डेटाबेस सेव्ह हँडलर
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // 🚀 खरं tRPC म्युटेशन - डेटा थेट MongoDB/DB मध्ये सेव्ह होईल
      await updateUserAsync({
        fullName: fullName.trim(),
      } as any);

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save settings to DB:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] w-full flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 p-4">
        <Loader2 className="h-8 w-8 animate-spin mb-3 text-emerald-500" />
        <p className="text-xs font-semibold tracking-wide uppercase">Loading Settings... ☕</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 pb-24">
      <form onSubmit={handleSaveSettings} className="max-w-4xl mx-auto space-y-8 w-full">
        {/* 🌟 हेडर आणि सेव्ह बटण */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Settings
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Manage your account profile, preferences, and workspace settings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5 animate-pulse">
                <CheckCircle2 className="h-4 w-4" /> Saved to DB!
              </span>
            )}
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 text-xs font-bold transition-all cursor-pointer shadow-md disabled:opacity-50 shrink-0"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving to DB...
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" /> Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* 1️⃣ PROFILE SECTION */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm dark:shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <User className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                Profile Information
              </h2>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Update your name and account details
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-emerald-500" /> Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> Email Address (Read-only)
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ""}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950/60 px-4 py-2.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* 2️⃣ PREFERENCES SECTION */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm dark:shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
            <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
              <Moon className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                App Preferences
              </h2>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Configure visual themes & notifications
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-950/50">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Moon className="h-3.5 w-3.5 text-amber-500" /> Interface Theme
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                  Choose between dark and light appearance
                </p>
              </div>

              <select
                value={themeMode}
                onChange={(e) => setThemeMode(e.target.value as "dark" | "light")}
                className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-bold text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer"
              >
                <option value="dark">Tokyo Dark</option>
                <option value="light">Light Mode</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-950/50">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Bell className="h-3.5 w-3.5 text-blue-500" /> Form Response Alerts
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                  Receive instant alerts when new data arrives
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAlertsEnabled(!alertsEnabled)}
                className={`px-4 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer border ${
                  alertsEnabled
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                    : "bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-500"
                }`}
              >
                {alertsEnabled ? "Enabled" : "Disabled"}
              </button>
            </div>
          </div>
        </div>

        {/* 3️⃣ ACCOUNT STATUS SECTION */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm dark:shadow-xl space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800/60">
            <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                Account Status & System
              </h2>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Workspace version details
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Plan:{" "}
                <strong className="text-zinc-900 dark:text-zinc-100">Free Developer Tier</strong>
              </span>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 w-fit">
              Version: v1.0.0-beta
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
