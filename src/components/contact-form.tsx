"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { contactFormSchema, type ContactFormInput } from "@/lib/validators";
import { Input, Textarea, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { vehicleCategories } from "@/data/vehicles";

type Status = "idle" | "success" | "error";

export function ContactForm() {
  const t = useTranslations();
  const locale = useLocale() as "de" | "nl" | "en";
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      category: "",
      period: "",
      message: "",
      consent: false,
      company: "",
    },
  });

  async function onSubmit(values: ContactFormInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-[--radius-lg] border border-green-200 bg-green-50 p-6 text-green-900">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
        <p>{t("contactPage.form.success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot – für Menschen unsichtbar */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register("company")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("contactPage.form.name")} error={errors.name?.message} t={t}>
          <Input
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Field>

        <Field label={t("contactPage.form.phone")} error={errors.phone?.message} t={t}>
          <Input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field label={t("contactPage.form.email")} error={errors.email?.message} t={t}>
        <Input
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("contactPage.form.vehicle")} t={t}>
          <Select {...register("category")} defaultValue="">
            <option value="" disabled>
              {t("contactPage.form.vehiclePlaceholder")}
            </option>
            {vehicleCategories.map((c) => (
              <option key={c.id} value={t(`categories.${c.id}.name`)}>
                {t(`categories.${c.id}.name`)}
              </option>
            ))}
          </Select>
        </Field>

        <Field label={t("contactPage.form.period")} t={t}>
          <Input
            placeholder={t("contactPage.form.periodPlaceholder")}
            {...register("period")}
          />
        </Field>
      </div>

      <Field label={t("contactPage.form.message")} t={t}>
        <Textarea
          placeholder={t("contactPage.form.messagePlaceholder")}
          {...register("message")}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-[--color-muted]">
        <input
          type="checkbox"
          className="mt-1 size-4 shrink-0 rounded border-[--color-border] accent-[--color-primary]"
          aria-invalid={!!errors.consent}
          {...register("consent")}
        />
        <span>{t("contactPage.form.consent")}</span>
      </label>
      {errors.consent && (
        <p className="text-sm text-red-600">{t(errors.consent.message as never)}</p>
      )}

      {status === "error" && (
        <div className="flex items-start gap-3 rounded-[--radius-md] border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p>{t("contactPage.form.error")}</p>
        </div>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting
          ? t("contactPage.form.submitting")
          : t("contactPage.form.submit")}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  t,
  children,
}: {
  label: string;
  error?: string;
  t: ReturnType<typeof useTranslations>;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[--color-text]">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{t(error as never)}</p>}
    </div>
  );
}
