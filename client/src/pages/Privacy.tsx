import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <h1 className="mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Privacy Policy</h1>
        <p className="mb-10" style={{ fontFamily: "'DM Sans', sans-serif", color: "#9CA3AF" }}>Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-10" style={{ fontFamily: "'DM Sans', sans-serif", color: "#374151", lineHeight: 1.8 }}>
          <section>
            <h2 style={{ fontFamily: "'Sora', sans-serif", color: "#111827" }}>1. Introduction</h2>
            <p className="mt-3">
              UpskillinTech ("we", "us", "our") operates the upskillintech.com website and related services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
            <p className="mt-3">Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our services.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Sora', sans-serif", color: "#111827" }}>2. Information We Collect</h2>
            <h3 className="mt-4 mb-2 text-base font-semibold" style={{ fontFamily: "'Sora', sans-serif", color: "#374151" }}>2.1 Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide, including:</p>
            <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
              <li>Name and email address</li>
              <li>Phone number</li>
              <li>Professional information (job title, company, industry)</li>
              <li>Payment and billing information</li>
              <li>Account credentials and profile information</li>
              <li>Communications and feedback you send to us</li>
            </ul>

            <h3 className="mt-5 mb-2 text-base font-semibold" style={{ fontFamily: "'Sora', sans-serif", color: "#374151" }}>2.2 Automatically Collected Information</h3>
            <p>When you access our website, we automatically collect certain information:</p>
            <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
              <li>Device information (browser type, IP address, operating system)</li>
              <li>Usage data (pages visited, time spent, links clicked)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Location information (based on IP address)</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Sora', sans-serif", color: "#111827" }}>3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
              <li>Provide and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send promotional and educational communications</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Analyze usage patterns and trends</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Sora', sans-serif", color: "#111827" }}>4. Legal Basis for Processing (GDPR)</h2>
            <p>In the UK and EU, we process your personal data based on one or more of the following legal grounds:</p>
            <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
              <li>Your explicit consent</li>
              <li>Performance of a contract with you</li>
              <li>Compliance with legal obligations</li>
              <li>Our legitimate interests</li>
              <li>Performance of a task in the public interest</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Sora', sans-serif", color: "#111827" }}>5. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to enhance your experience. Types of cookies we use:</p>
            <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
              <li>Essential cookies (required for site functionality)</li>
              <li>Performance cookies (analyzing site usage)</li>
              <li>Functional cookies (remembering your preferences)</li>
              <li>Marketing cookies (delivering targeted content)</li>
            </ul>
            <p className="mt-3">You can control cookie preferences through your browser settings. However, disabling cookies may affect site functionality.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Sora', sans-serif", color: "#111827" }}>6. Data Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share information with:</p>
            <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
              <li>Service providers who assist in our operations</li>
              <li>Law enforcement when required by law</li>
              <li>Other parties with your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Sora', sans-serif", color: "#111827" }}>7. Your Privacy Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
              <li><strong>Right to Access:</strong> Obtain a copy of your personal data</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your data</li>
              <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Right to Object:</strong> Object to certain processing activities</li>
            </ul>
            <p className="mt-3">To exercise these rights, please contact us at <a href="mailto:privacy@upskillintech.com" style={{ color: "#0D9488" }}>privacy@upskillintech.com</a>.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Sora', sans-serif", color: "#111827" }}>8. Data Security</h2>
            <p>We implement appropriate technical and organizational security measures to protect your personal information, including SSL/TLS encryption, secure authentication, and regular security audits.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Sora', sans-serif", color: "#111827" }}>9. Data Protection Officer</h2>
            <p>As a UK-based organisation, we have appointed a Data Protection Officer. Contact our DPO at <a href="mailto:dpo@upskillintech.com" style={{ color: "#0D9488" }}>dpo@upskillintech.com</a>.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Sora', sans-serif", color: "#111827" }}>10. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us:</p>
            <div className="mt-4 p-5 rounded-xl" style={{ background: "#F7F8FA" }}>
              <p><strong>UpskillinTech</strong></p>
              <p>Email: <a href="mailto:privacy@upskillintech.com" style={{ color: "#0D9488" }}>privacy@upskillintech.com</a></p>
              <p>Website: upskillintech.com</p>
              <p className="mt-4"><strong>UK Information Commissioner's Office</strong></p>
              <p>Website: <a href="https://www.ico.org.uk" target="_blank" rel="noreferrer" style={{ color: "#0D9488" }}>www.ico.org.uk</a></p>
              <p>Phone: +44 303 123 1113</p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
