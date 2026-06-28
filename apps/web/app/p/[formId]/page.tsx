"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useGetForm, useSubmitForm } from "~/hooks/api/form";
import { CheckCircle2, Loader2, User, Hash, Mail, Lock, HelpCircle, ArrowLeft } from "lucide-react";

export default function PublicFormPage() {
  const params = useParams();
  const router = useRouter();
  const formId = params.formId as string;

  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { form, isLoading, error } = useGetForm(formId);
  const { submitFormAsync, status: submitStatus } = useSubmitForm();

  const handleInputChange = (fieldId: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payloadValues = Object.entries(formValues).map(([formFieldId, value]) => ({
      formFieldId,
      value,
    }));

    try {
      await submitFormAsync({
        formId,
        values: payloadValues,
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const getFieldIcon = (type: string) => {
    const iconClass = "absolute left-4 top-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-600";
    switch (type.toUpperCase()) {
      case "TEXT":
        return <User className={iconClass} />;
      case "NUMBER":
        return <Hash className={iconClass} />;
      case "EMAIL":
        return <Mail className={iconClass} />;
      case "PASSWORD":
        return <Lock className={iconClass} />;
      default:
        return <HelpCircle className={iconClass} />;
    }
  };

  if (isLoading) {
    return (
      <div className="dark min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-[#09090b] text-zinc-400 dark:text-zinc-500">
        <Loader2 className="h-6 w-6 animate-spin mb-2 text-zinc-900 dark:text-zinc-50" />
        <p className="text-xs font-semibold tracking-wide uppercase">Loading Form... ☕</p>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="dark min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-[#09090b] p-4">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] p-8 text-center shadow-xl">
          <h2 className="text-lg font-bold text-red-500">Form Not Found</h2>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="dark min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-[#09090b] p-4">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] p-8 text-center space-y-4 shadow-xl">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            Submission Received!
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Your response has been successfully recorded.
          </p>

          <button
            onClick={() => router.push("/dashboard")}
            className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 transition-all cursor-pointer bg-zinc-100/50 dark:bg-zinc-900/50"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dark min-h-screen w-full bg-zinc-50 dark:bg-[#09090b] p-6 sm:p-12 overflow-y-auto flex flex-col justify-center items-center">
      {/* मुख्य फॉर्म कार्ड बॉक्स */}
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] p-8 shadow-xl h-auto flex flex-col">
        {/* फॉर्म हेडर */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 capitalize">
            {form.title}
          </h1>
          {form.description && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{form.description}</p>
          )}
        </div>

        {/* फॉर्म बॉडी */}
        <form onSubmit={handleSubmit} className="space-y-5 flex-1">
          {form.fields.map((field) => (
            <div key={field.id} className="space-y-2 relative rounded-xl transition-all">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                {field.label}
                {field.isRequired && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === "YES_NO" ? (
                <div className="flex items-center gap-3 py-1 px-1">
                  <input
                    type="checkbox"
                    id={field.id}
                    required={field.isRequired}
                    checked={formValues[field.id] === "true"}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.checked ? "true" : "false")
                    }
                    className="rounded-md border-zinc-200 dark:border-zinc-800 h-4 w-4 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 accent-zinc-500 cursor-pointer"
                  />
                  <label
                    htmlFor={field.id}
                    className="text-sm text-zinc-500 dark:text-zinc-400 font-medium cursor-pointer select-none"
                  >
                    {field.placeholder || "Consent option checkbox setup"}
                  </label>
                </div>
              ) : (
                <div className="relative">
                  {getFieldIcon(field.type)}
                  <input
                    type={
                      field.type === "PASSWORD"
                        ? "password"
                        : field.type === "NUMBER"
                          ? "number"
                          : field.type === "EMAIL"
                            ? "email"
                            : "text"
                    }
                    placeholder={field.placeholder ?? undefined}
                    required={field.isRequired}
                    value={formValues[field.id] || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-3 pl-11 pr-4 text-sm text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 shadow-sm transition-all"
                  />
                </div>
              )}
            </div>
          ))}

          {/* सबमिट बटन */}
          <button
            type="submit"
            disabled={submitStatus === "pending"}
            className="w-full mt-6 flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-50 py-3 text-sm font-semibold text-zinc-50 dark:text-zinc-900 shadow-md active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40"
          >
            {submitStatus === "pending" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit Form"
            )}
          </button>

          {/* 🎯 मॅजिक चेंज: सबमिट बटनाच्या खाली एकदम सेंटरला कडक 'Back to Dashboard' लिंक */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-zinc-950 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors cursor-pointer group select-none"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-zinc-500 group-hover:text-zinc-300 transition-transform group-hover:-translate-x-0.5" />
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
