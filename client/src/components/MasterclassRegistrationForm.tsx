import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type Currency = "GBP" | "USD";

const PRICING: Record<Currency, { amount: string; region: string; priceIdEnv: string }> = {
  GBP: { amount: "£50", region: "United Kingdom", priceIdEnv: "NEXT_PUBLIC_STRIPE_PRICE_GBP" },
  USD: { amount: "$50", region: "All Other Regions", priceIdEnv: "NEXT_PUBLIC_STRIPE_PRICE_USD" },
};

const INCLUDED = [
  "Two live sessions: Saturday 1 August and Saturday 8 August 2026",
  "Hands-on guidance across ten practical modules",
  "A free one-to-one AI consultation session",
  "Session recordings and workbook materials",
];

const labelStyle: React.CSSProperties = {
  fontFamily: "'Sora', sans-serif",
  fontSize: "1rem",
  fontWeight: 600,
  color: "#111111",
  marginBottom: "0.375rem",
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "1rem",
  color: "#111111",
  background: "#ffffff",
  border: "1.5px solid #d0d5dc",
  borderRadius: "0.625rem",
  padding: "0.75rem 1rem",
  outline: "none",
};

export default function MasterclassRegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState<Currency>("GBP");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const price = PRICING[currency];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName, phone, country, currency }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to start checkout. Please try again.");
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Checkout session was created but no redirect URL was returned.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form
      id="register"
      onSubmit={handleSubmit}
      style={{
        background: "#ffffff",
        borderRadius: "1.25rem",
        padding: "2rem",
        boxShadow: "0 16px 48px rgba(0,0,0,0.10)",
        border: "1px solid #e2e2e2",
        display: "flex",
        flexDirection: "column",
        gap: "1.125rem",
      }}
    >
      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#111111", marginBottom: "0.25rem" }}>
        Register for the AI Masterclass
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label htmlFor="mc-first-name" style={labelStyle}>First Name *</label>
          <input
            id="mc-first-name"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={inputStyle}
            autoComplete="given-name"
          />
        </div>
        <div>
          <label htmlFor="mc-last-name" style={labelStyle}>Last Name *</label>
          <input
            id="mc-last-name"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={inputStyle}
            autoComplete="family-name"
          />
        </div>
      </div>

      <div>
        <label htmlFor="mc-email" style={labelStyle}>Email Address *</label>
        <input
          id="mc-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="mc-phone" style={labelStyle}>Phone Number (optional)</label>
        <input
          id="mc-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
          autoComplete="tel"
        />
      </div>

      <div>
        <label htmlFor="mc-country" style={labelStyle}>Country *</label>
        <input
          id="mc-country"
          type="text"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={inputStyle}
          autoComplete="country-name"
        />
      </div>

      <div>
        <label htmlFor="mc-currency" style={labelStyle}>Payment Currency *</label>
        <select
          id="mc-currency"
          required
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
          style={inputStyle}
        >
          <option value="GBP">£50 GBP (United Kingdom)</option>
          <option value="USD">$50 USD (All Other Regions)</option>
        </select>
      </div>

      {/* Summary box */}
      <div
        style={{
          background: "#f4f4f4",
          borderRadius: "0.875rem",
          padding: "1.25rem 1.5rem",
          border: "1px solid #e2e2e2",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.75rem" }}>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#111111" }}>
            Your registration
          </span>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#111111" }}>
            {price.amount}
            <span style={{ fontSize: "1rem", fontWeight: 600, color: "#111111" }}> · {price.region}</span>
          </span>
        </div>
        <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {INCLUDED.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
              <CheckCircle2 size={17} style={{ color: "#2ecc71", flexShrink: 0, marginTop: "3px" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#111111", lineHeight: 1.5 }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {error && (
        <p role="alert" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#b91c1c" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        style={{
          background: "#2ecc71",
          color: "#0d1117",
          fontFamily: "'Sora', sans-serif",
          fontWeight: 700,
          fontSize: "1.05rem",
          padding: "1rem 2rem",
          borderRadius: "0.75rem",
          border: "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Redirecting to secure checkout…
          </>
        ) : (
          <>Secure Your Spot — {price.amount}</>
        )}
      </button>

      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#111111", textAlign: "center" }}>
        Payment is processed securely by Stripe.
      </p>
    </form>
  );
}
