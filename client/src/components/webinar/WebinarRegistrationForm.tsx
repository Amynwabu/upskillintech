import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { trpc } from "@/lib/trpc";
import type { PublicWebinar } from "@shared/webinar";
import { getWebinarPhase } from "@shared/webinar";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organisation: string;
  role: string;
  automationGoal: string;
  eventConsent: boolean;
  marketingConsent: boolean;
  website: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organisation: "",
  role: "",
  automationGoal: "",
  eventConsent: false,
  marketingConsent: false,
  website: "",
};

export default function WebinarRegistrationForm({
  webinar,
}: {
  webinar: PublicWebinar;
}) {
  const [, navigate] = useLocation();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const phase = getWebinarPhase({
    ...webinar,
    eventStartAt: webinar.eventStartAt ? new Date(webinar.eventStartAt) : null,
    eventEndAt: webinar.eventEndAt ? new Date(webinar.eventEndAt) : null,
    registrationOpensAt: webinar.registrationOpensAt
      ? new Date(webinar.registrationOpensAt)
      : null,
    registrationClosesAt: webinar.registrationClosesAt
      ? new Date(webinar.registrationClosesAt)
      : null,
  });
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const mutation = trpc.webinar.register.useMutation({
    onSuccess(data) {
      if (data.confirmationToken) {
        sessionStorage.setItem(
          "webinarConfirmationToken",
          data.confirmationToken
        );
        navigate(`/webinars/${webinar.slug}/registered`);
      }
    },
  });
  const registrationOpen = phase === "registration_open";

  const set = (field: keyof FormState, value: string | boolean) => {
    setForm(previous => ({ ...previous, [field]: value }));
    setErrors(previous => ({ ...previous, [field]: undefined }));
  };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!form.firstName.trim()) nextErrors.firstName = "Enter your first name";
    if (!form.lastName.trim()) nextErrors.lastName = "Enter your last name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = "Enter a valid email address";
    if (!form.role.trim()) nextErrors.role = "Tell us your current role";
    if (!form.eventConsent)
      nextErrors.eventConsent =
        "Consent is required for essential event messages";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      document.getElementById(`webinar-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }
    mutation.mutate({
      slug: webinar.slug,
      ...form,
      eventConsent: true,
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
      utmContent: params.get("utm_content") ?? undefined,
      utmTerm: params.get("utm_term") ?? undefined,
      referrerUrl: document.referrer || undefined,
      landingPage: window.location.href,
    });
  };

  return (
    <form className="webinar-form" onSubmit={submit} noValidate>
      <div className="webinar-form__heading">
        <h2>Reserve Your Free Seat</h2>
        <p>
          Complete the form below to receive your confirmation and webinar
          access details.
        </p>
      </div>
      <Field
        label="First name"
        id="firstName"
        value={form.firstName}
        error={errors.firstName}
        autoComplete="given-name"
        onChange={value => set("firstName", value)}
      />
      <Field
        label="Last name"
        id="lastName"
        value={form.lastName}
        error={errors.lastName}
        autoComplete="family-name"
        onChange={value => set("lastName", value)}
      />
      <Field
        label="Email address"
        id="email"
        value={form.email}
        error={errors.email}
        type="email"
        autoComplete="email"
        onChange={value => set("email", value)}
      />
      <Field
        label="Current role"
        id="role"
        value={form.role}
        error={errors.role}
        autoComplete="organization-title"
        onChange={value => set("role", value)}
      />
      <Field
        label="Phone number — optional"
        id="phone"
        value={form.phone}
        type="tel"
        autoComplete="tel"
        onChange={value => set("phone", value)}
      />
      <label className="webinar-field" htmlFor="webinar-automationGoal">
        <span>
          What would you like an AI employee to help you with? — optional
        </span>
        <textarea
          id="webinar-automationGoal"
          rows={3}
          maxLength={2000}
          value={form.automationGoal}
          onChange={event => set("automationGoal", event.target.value)}
        />
      </label>
      <input
        className="webinar-honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        name="website"
        value={form.website}
        onChange={event => set("website", event.target.value)}
      />
      <Check
        id="eventConsent"
        checked={form.eventConsent}
        error={errors.eventConsent}
        onChange={value => set("eventConsent", value)}
      >
        I agree to receive essential webinar confirmation, access details and
        reminders.
      </Check>
      <Check
        id="marketingConsent"
        checked={form.marketingConsent}
        onChange={value => set("marketingConsent", value)}
      >
        I would also like to receive future AI training and event updates from
        UpskillinTech.
      </Check>
      {mutation.error && (
        <p className="webinar-form__error" role="alert">
          {mutation.error.message}
        </p>
      )}
      {!registrationOpen && (
        <p className="webinar-form__notice" role="status">
          {phase === "date_pending"
            ? "Registration will open when the webinar date is confirmed."
            : phase === "registration_not_open"
              ? "Registration is not open yet."
              : "Registration is currently closed."}
        </p>
      )}
      <button
        className="webinar-button webinar-button--primary webinar-form__submit"
        disabled={!registrationOpen || mutation.isPending}
        type="submit"
      >
        {mutation.isPending ? (
          <LoaderCircle className="webinar-spin" size={20} />
        ) : null}
        {mutation.isPending ? "Reserving your seat…" : "Reserve My Seat"}
      </button>
      <p className="webinar-form__secure">
        <LockKeyhole size={15} /> Free registration. Confirmation will be sent
        by email.
      </p>
      <div aria-live="polite" className="sr-only">
        {mutation.isPending ? "Submitting registration" : ""}
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  value,
  error,
  type = "text",
  autoComplete,
  onChange,
}: {
  label: string;
  id: string;
  value: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="webinar-field" htmlFor={`webinar-${id}`}>
      <span>{label}</span>
      <input
        id={`webinar-${id}`}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `webinar-${id}-error` : undefined}
        onChange={event => onChange(event.target.value)}
      />
      {error && (
        <small id={`webinar-${id}-error`} role="alert">
          {error}
        </small>
      )}
    </label>
  );
}

function Check({
  id,
  checked,
  error,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  error?: string;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="webinar-check" htmlFor={`webinar-${id}`}>
        <input
          id={`webinar-${id}`}
          type="checkbox"
          checked={checked}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `webinar-${id}-error` : undefined}
          onChange={event => onChange(event.target.checked)}
        />
        <span>{children}</span>
      </label>
      {error && (
        <small
          className="webinar-check__error"
          id={`webinar-${id}-error`}
          role="alert"
        >
          {error}
        </small>
      )}
    </div>
  );
}
