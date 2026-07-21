"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetForm, useSubmitForm } from "~/hooks/api/form";
import {
  CheckCircle2,
  Loader2,
  User,
  Hash,
  Mail,
  Lock,
  HelpCircle,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export default function PublicFormPage() {
  const params = useParams();
  const formId = (params?.formId || params?.id) as string;

  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { form, isLoading, error } = useGetForm(formId);
  const { submitFormAsync, status: submitStatus } = useSubmitForm();

  // ✍️ इनपुट बदलल्यावर एरर घालवणे
  const handleInputChange = (fieldId: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));

    if (errors[fieldId]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[fieldId];
        return updated;
      });
    }
  };

  // 🚀 फॉर्म सबमिशन लॉजिक (Fixed Zod Array Issue)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form?.fields || form.fields.length === 0) return;

    // 🎯 १. क्लायंट साईड व्हॅलिडेशन चेकिंग
    const validationErrors: Record<string, string> = {};
    form.fields.forEach((field) => {
      const val = formValues[field.id];
      if (field.isRequired && (!val || !val.trim() || val === "false")) {
        validationErrors[field.id] = "This field is required";
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // 🎯 २. मॅजिक फिक्स: Object.entries ऐवजी form.fields वर मॅप करा (ज्यामुळे ॲरे कधीच रिकामा जाणार नाही)
    const payloadValues = form.fields.map((field) => ({
      formFieldId: field.id,
      value: formValues[field.id] || "",
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

  const getFieldIcon = (type: string, hasError: boolean) => {
    const iconClass = `absolute left-4 top-3.5 h-4 w-4 transition-colors ${
      hasError ? "text-red-500" : "text-zinc-400 dark:text-zinc-600"
    }`;
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
      <div className="dark min-h-screen w-full flex flex-col items-center justify-center bg-zinc-950 text-zinc-400">
        <Loader2 className="h-7 w-7 animate-spin mb-3 text-emerald-500" />
        <p className="text-xs font-semibold tracking-wide uppercase">Loading Form... ☕</p>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="dark min-h-screen w-full flex items-center justify-center bg-zinc-950 p-4">
        <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-zinc-900 p-8 text-center shadow-xl">
          <h2 className="text-base font-bold text-red-500">Form Not Found or Unavailable</h2>
        </div>
      </div>
    );
  }

  // 🎯 सबमिशन सक्सेस स्क्रीन
  if (isSubmitted) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 text-zinc-100 p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md rounded-3xl border border-emerald-500/20 bg-zinc-900/90 backdrop-blur-xl p-8 sm:p-10 text-center space-y-6 shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)] animate-in fade-in zoom-in-95 duration-300">
          <div className="relative mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-zinc-50 tracking-tight">
              Submission Received! 🎉
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
              Thank you for taking the time. Your response has been recorded successfully.
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-center gap-1.5 text-[11px] font-medium text-zinc-500 select-none">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            <span>
              Powered by <strong className="text-zinc-300 font-bold">ChaiForms</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 🎯 मुख्य पब्लीक फॉर्म
  return (
    <div className="dark min-h-screen w-full bg-[#09090b] text-zinc-100 p-6 sm:p-12 overflow-y-auto flex flex-col justify-center items-center">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-[#121214] p-8 shadow-2xl h-auto flex flex-col">
        {/* फॉर्म हेडर */}
        <div className="text-center mb-8 space-y-1.5">
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-50 capitalize">
            {form.title}
          </h1>
          {form.description && (
            <p className="text-xs text-zinc-400 leading-relaxed">{form.description}</p>
          )}
        </div>

        {/* फॉर्म बॉडी */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5 flex-1">
          {form.fields.map((field) => {
            const hasError = Boolean(errors[field.id]);

            return (
              <div key={field.id} className="space-y-1.5 relative rounded-xl transition-all">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                  {field.label}
                  {field.isRequired && <span className="text-emerald-500 ml-1">*</span>}
                </label>

                {field.type === "YES_NO" ? (
                  <div className="space-y-1">
                    <div
                      className={`flex items-center gap-3 py-2.5 px-3 rounded-xl border transition-all ${
                        hasError ? "border-red-500/80 bg-red-500/5" : "border-zinc-800 bg-zinc-950"
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={field.id}
                        checked={formValues[field.id] === "true"}
                        onChange={(e) =>
                          handleInputChange(field.id, e.target.checked ? "true" : "false")
                        }
                        className="rounded-md border-zinc-800 h-4 w-4 bg-zinc-950 text-emerald-500 accent-emerald-500 cursor-pointer"
                      />
                      <label
                        htmlFor={field.id}
                        className="text-xs text-zinc-300 font-medium cursor-pointer select-none"
                      >
                        {field.placeholder || "I agree to the terms"}
                      </label>
                    </div>

                    {hasError && (
                      <p className="text-[11px] text-red-400 font-semibold flex items-center gap-1 pl-1 animate-in fade-in duration-150">
                        <AlertCircle className="h-3 w-3 shrink-0" /> {errors[field.id]}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="relative">
                      {getFieldIcon(field.type, hasError)}
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
                        value={formValues[field.id] || ""}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className={`w-full rounded-xl border bg-zinc-950 py-3 pl-11 pr-4 text-xs text-zinc-50 placeholder:text-zinc-600 focus:outline-none transition-all ${
                          hasError
                            ? "border-red-500/80 focus:ring-2 focus:ring-red-500/30"
                            : "border-zinc-800 focus:ring-2 focus:ring-emerald-500/30"
                        }`}
                      />
                    </div>

                    {hasError && (
                      <p className="text-[11px] text-red-400 font-semibold flex items-center gap-1 pl-1 animate-in fade-in duration-150">
                        <AlertCircle className="h-3 w-3 shrink-0" /> {errors[field.id]}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* सबमिट बटन */}
          <button
            type="submit"
            disabled={submitStatus === "pending"}
            className="w-full mt-6 flex items-center justify-center gap-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 py-3 text-xs font-bold shadow-md active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40"
          >
            {submitStatus === "pending" ? (
              <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
            ) : (
              "Submit Form"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
