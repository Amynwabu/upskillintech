import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./webinar.css";

export default function WebinarPrivacy() {
  return (
    <div className="webinar-page">
      <Navbar />
      <main className="webinar-legal">
        <div className="webinar-shell">
          <span>Webinar privacy notice</span>
          <h1>How we use your webinar registration information</h1>
          <p>UpskillinTech collects your name, email address, role, consent choices and any optional information you provide so we can manage your registration and deliver the webinar.</p>
          <h2>Essential event communication</h2>
          <p>Your confirmation, access information, operational updates and event reminders are essential to delivering the webinar you requested. You can cancel your registration using the secure preference link in an event email.</p>
          <h2>Optional marketing</h2>
          <p>Future training, webinar and masterclass updates are sent only when you separately choose marketing updates. You can withdraw that choice at any time without cancelling an active webinar registration.</p>
          <h2>Campaign and technical information</h2>
          <p>We may record campaign source fields, the page used to register, browser user-agent information and a one-way hash derived from the request address for attribution and abuse prevention. We do not use the webinar page to store raw IP addresses.</p>
          <h2>Service providers and retention</h2>
          <p>The application is hosted through Netlify, uses the configured database service, and uses SendGrid for event email. Information is retained only for event delivery, attendance administration, legitimate reporting and any communications you have chosen. A final retention period must be confirmed in UpskillinTech’s organisation-wide data retention policy.</p>
          <h2>Your choices</h2>
          <p>Use the secure link in a webinar email to change your preference or cancel. For access, correction or deletion requests, contact the support address included in the webinar email.</p>
          <Link href="/webinar/ai-employee">Return to the webinar</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

