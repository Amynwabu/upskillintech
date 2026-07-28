import { useMemo, useState } from "react";
import { Link } from "wouter";
import { CheckCircle2, ClipboardCheck, Copy, Linkedin, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WebinarCountdown from "@/components/webinar/WebinarCountdown";
import WebinarCalendarButtons from "@/components/webinar/WebinarCalendarButtons";
import { trpc } from "@/lib/trpc";
import { AI_EMPLOYEE_WEBINAR_SLUG, formatWebinarDate } from "@shared/webinar";
import "./webinar.css";

export default function WebinarRegistered({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug ?? AI_EMPLOYEE_WEBINAR_SLUG;
  const token = useMemo(() => sessionStorage.getItem("webinarConfirmationToken"), []);
  const { data, isLoading } = trpc.webinar.confirmation.useQuery(
    { token: token ?? "" },
    { enabled: Boolean(token), retry: false },
  );
  const [copied, setCopied] = useState(false);
  const canonical = `${window.location.origin}/webinars/${slug}`;
  const share = "I’ve registered for the free UpskillinTech webinar: Build Your First AI Employee That Works 24/7—Without Coding. Join me and learn practical AI automation without traditional coding.";

  if (isLoading) return <div className="webinar-utility-state">Loading your registration…</div>;
  return (
    <div className="webinar-page">
      <Navbar />
      <main className="webinar-registered">
        <div className="webinar-registered__card">
          <CheckCircle2 size={54} />
          <span>Registration complete</span>
          <h1>You’re registered{data?.firstName ? `, ${data.firstName}` : ""}!</h1>
          {data ? (
            <>
              <h2>{data.webinar.title}</h2>
              <p className="webinar-registered__date">{formatWebinarDate(data.webinar.eventStartAt, data.webinar.timezone)}</p>
              <p>{data.confirmationSent ? "Your confirmation email has been sent." : "Your confirmation email is queued and will arrive shortly."}</p>
              <WebinarCalendarButtons slug={data.webinar.slug} />
              <WebinarCountdown webinar={data.webinar} compact />
            </>
          ) : (
            <p>Your registration was successful. For privacy, reopen this page from the same browser session or use your confirmation email for event details.</p>
          )}
          <div className="webinar-prep">
            <ClipboardCheck size={24} />
            <div><strong>Prepare for the session</strong><ul><li>Choose one repetitive task you want to automate</li><li>Use a laptop where possible</li><li>Join five minutes early</li></ul></div>
          </div>
          <div className="webinar-share">
            <strong>Invite someone to learn with you</strong>
            <div>
              <a href={`https://wa.me/?text=${encodeURIComponent(`${share} ${canonical}`)}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}`} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a>
              <button onClick={async () => { await navigator.clipboard.writeText(canonical); setCopied(true); }}><Copy size={18} /> {copied ? "Copied" : "Copy link"}</button>
            </div>
          </div>
          <Link href="/" className="webinar-back-link">Back to UpskillinTech</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

