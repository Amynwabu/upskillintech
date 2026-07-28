import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import "./webinar.css";

export default function WebinarUnsubscribe() {
  const token = useMemo(() => new URLSearchParams(window.location.search).get("token") ?? "", []);
  const [message, setMessage] = useState("");
  const mutation = trpc.webinar.unsubscribe.useMutation({
    onSuccess(data) {
      setMessage(data.action === "marketing_opt_out"
        ? "You will no longer receive optional marketing updates. Essential webinar messages remain active."
        : "Your webinar registration has been cancelled and pending reminders have been stopped.");
    },
  });
  return (
    <div className="webinar-page">
      <Navbar />
      <main className="webinar-preferences">
        <div className="webinar-registered__card">
          <span>Communication preferences</span>
          <h1>Choose what you want to change</h1>
          <p>Optional marketing and essential webinar delivery are kept separate. Cancelling registration also stops pending webinar reminders.</p>
          {!token && <p className="webinar-form__error">This preference link is incomplete. Please use the secure link from your email.</p>}
          {mutation.error && <p className="webinar-form__error" role="alert">{mutation.error.message}</p>}
          {message && <p className="webinar-form__notice" role="status">{message}</p>}
          <div className="webinar-preference-actions">
            <button className="webinar-button webinar-button--secondary" disabled={!token || mutation.isPending} onClick={() => mutation.mutate({ token, action: "marketing_opt_out" })}>Stop optional marketing</button>
            <button className="webinar-button webinar-button--danger" disabled={!token || mutation.isPending} onClick={() => mutation.mutate({ token, action: "cancel_registration" })}>Cancel webinar registration</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

