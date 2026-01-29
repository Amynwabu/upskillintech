export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-gray-700 leading-7">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              UpskillinTech ("we", "us", "our", or "Company") operates the upskillintech.com website and related services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p className="mt-4">
              Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1 Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide, including:</p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Name and email address</li>
              <li>Phone number</li>
              <li>Professional information (job title, company, industry)</li>
              <li>Payment and billing information</li>
              <li>Account credentials and profile information</li>
              <li>Communications and feedback you send to us</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.2 Automatically Collected Information</h3>
            <p>When you access our website, we automatically collect certain information:</p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Device information (browser type, IP address, operating system)</li>
              <li>Usage data (pages visited, time spent, links clicked)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Location information (based on IP address)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc list-inside mt-2 ml-2">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Legal Basis for Processing (GDPR)</h2>
            <p>In the UK and EU, we process your personal data based on one or more of the following legal grounds:</p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Your explicit consent</li>
              <li>Performance of a contract with you</li>
              <li>Compliance with legal obligations</li>
              <li>Protection of vital interests</li>
              <li>Our legitimate interests</li>
              <li>Performance of a task in the public interest</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience. Cookies are small files stored on your device that help us recognize you and understand your preferences.
            </p>
            <p className="mt-4">
              Types of cookies we use:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Essential cookies (required for site functionality)</li>
              <li>Performance cookies (analyzing site usage)</li>
              <li>Functional cookies (remembering your preferences)</li>
              <li>Marketing cookies (delivering targeted content)</li>
            </ul>
            <p className="mt-4">
              You can control cookie preferences through your browser settings. However, disabling cookies may affect site functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share information with:</p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Service providers who assist in our operations (payment processors, hosting providers)</li>
              <li>Law enforcement when required by law</li>
              <li>Other parties with your explicit consent</li>
              <li>Business partners for legitimate business purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. The retention period depends on the type of information and the legal basis for processing.
            </p>
            <p className="mt-4">
              When information is no longer needed, we securely delete or anonymize it, unless we are required to retain it for legal compliance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Privacy Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li><strong>Right to Access:</strong> Obtain a copy of your personal data</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your data ("Right to be Forgotten")</li>
              <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Right to Object:</strong> Object to certain processing activities</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at privacy@upskillintech.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p className="mt-4">
              Security measures include:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Encryption of data in transit (SSL/TLS)</li>
              <li>Secure authentication mechanisms</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal information</li>
              <li>Employee confidentiality agreements</li>
            </ul>
            <p className="mt-4">
              However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. This Privacy Policy does not apply to those external sites. We encourage you to review their privacy policies before providing personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Children's Privacy</h2>
            <p>
              Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will take steps to delete such information promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. International Data Transfers</h2>
            <p>
              Your information may be transferred to, stored in, and processed in countries other than your country of residence. These countries may have data protection laws different from your home country.
            </p>
            <p className="mt-4">
              When we transfer data internationally, we implement appropriate safeguards, including Standard Contractual Clauses and other GDPR-compliant mechanisms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Data Protection Officer</h2>
            <p>
              As a UK-based organization, we have appointed a Data Protection Officer to oversee our data protection practices. You can contact our DPO at dpo@upskillintech.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Policy Changes</h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. The updated policy will be posted on this page with an updated "Last updated" date.
            </p>
            <p className="mt-4">
              Your continued use of our services after such modifications constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or our privacy practices, please contact us at:</p>
            <div className="mt-4 bg-gray-50 p-4 rounded">
              <p><strong>UpskillinTech</strong></p>
              <p>Email: privacy@upskillintech.com</p>
              <p>Website: upskillintech.com</p>
              <p className="mt-4"><strong>UK Information Commissioner's Office</strong></p>
              <p>If you have concerns about how we handle your data, you have the right to lodge a complaint with the ICO:</p>
              <p>Website: www.ico.org.uk</p>
              <p>Phone: +44 303 123 1113</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
