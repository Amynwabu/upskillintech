export default function Cookies() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-gray-700 leading-7">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              UpskillinTech ("Company") uses cookies and similar tracking technologies on our website (upskillintech.com) to enhance user experience, analyze usage, and improve our services. This Cookie Policy explains what cookies are, how we use them, and your choices regarding cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device (computer, tablet, or smartphone) when you visit our website. They contain information that helps identify you and remember your preferences.
            </p>
            <p className="mt-4">
              Similar technologies include:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Web beacons (small graphics files that track page visits)</li>
              <li>Pixel tags (invisible images that measure engagement)</li>
              <li>Local storage (technology similar to cookies)</li>
              <li>Session storage (temporary data storage during your visit)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.1 Essential Cookies</h3>
            <p>
              These cookies are strictly necessary for the website to function properly. They enable core functionalities such as:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>User authentication and login</li>
              <li>Security and fraud prevention</li>
              <li>Session management</li>
              <li>Basic website navigation</li>
            </ul>
            <p className="mt-2">
              <strong>Consent Required:</strong> No - These cookies are essential for the website to function.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.2 Performance Cookies</h3>
            <p>
              These cookies help us understand how visitors use our website, including:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Pages visited and time spent on each page</li>
              <li>Bounce rates and user flow patterns</li>
              <li>Error messages and technical issues</li>
              <li>Website speed and performance metrics</li>
            </ul>
            <p className="mt-2">
              We use services like Google Analytics for this purpose. No personal information is collected through these cookies.
            </p>
            <p className="mt-2">
              <strong>Consent Required:</strong> Yes - Performance cookies require your consent.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.3 Functional Cookies</h3>
            <p>
              These cookies remember your preferences and choices, such as:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Language and regional settings</li>
              <li>Account preferences and settings</li>
              <li>Saved items and bookmarks</li>
              <li>User interface preferences (dark mode, layout)</li>
            </ul>
            <p className="mt-2">
              <strong>Consent Required:</strong> Yes - Functional cookies require your consent for non-essential preferences.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.4 Marketing Cookies</h3>
            <p>
              These cookies track your browsing activity to deliver personalized advertising and content, including:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Targeted advertisements based on interests</li>
              <li>Remarketing across different websites</li>
              <li>Social media integration and sharing</li>
              <li>Campaign performance tracking</li>
            </ul>
            <p className="mt-2">
              <strong>Consent Required:</strong> Yes - Marketing cookies require explicit consent before deployment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookie Duration</h2>
            <p>
              Cookies are classified by their lifespan:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain on your device for a set period (days, months, or years)</li>
            </ul>
            <p className="mt-4">
              Most of our cookies expire within 1-2 years, though some may persist longer to maintain your preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Cookies</h2>
            <p>
              We allow third-party service providers to place cookies on our website for:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Analytics (Google Analytics)</li>
              <li>Customer support (Zendesk, Intercom)</li>
              <li>Payment processing (Stripe, PayPal)</li>
              <li>Email marketing (Mailchimp, HubSpot)</li>
              <li>Social media (Facebook, Twitter, LinkedIn pixels)</li>
            </ul>
            <p className="mt-4">
              These third parties have their own cookie policies. We encourage you to review their privacy statements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Cookie Choices</h2>
            <p>
              You have several options to control cookies:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li><strong>Cookie Consent Tool:</strong> Use our consent banner to manage cookie preferences when you first visit</li>
              <li><strong>Browser Settings:</strong> Most browsers allow you to refuse cookies or alert you when a cookie is being set</li>
              <li><strong>Disable Cookies:</strong> You can disable all cookies through browser settings (may affect site functionality)</li>
              <li><strong>Do Not Track:</strong> Some browsers support Do Not Track signals, though not all websites honor them</li>
            </ul>
            <p className="mt-4">
              Instructions for managing cookies in popular browsers:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Chrome: Settings {'>>'} Privacy and security {'>>'} Cookies and other site data</li>
              <li>Firefox: Preferences {'>>'} Privacy &amp; Security {'>>'} Cookies and Site Data</li>
              <li>Safari: Preferences {'>>'} Privacy {'>>'} Cookies and website data</li>
              <li>Edge: Settings {'>>'} Privacy, search, and services {'>>'} Cookies and other site permissions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Impact of Disabling Cookies</h2>
            <p>
              Disabling cookies may affect your experience on our website:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>You may not be able to log into your account</li>
              <li>Some features may not function properly</li>
              <li>Your preferences may not be saved</li>
              <li>Personalized content may not be available</li>
            </ul>
            <p className="mt-4">
              Essential cookies cannot be disabled as they are required for the website to function.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. GDPR and Cookie Consent</h2>
            <p>
              Under UK GDPR and ePrivacy regulations, we must obtain your explicit consent before using non-essential cookies. We use a cookie consent banner to:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>Inform you about our cookie usage</li>
              <li>Obtain consent for non-essential cookies</li>
              <li>Allow you to manage your preferences</li>
              <li>Provide options to withdraw consent</li>
            </ul>
            <p className="mt-4">
              Your consent is recorded and can be withdrawn at any time by clearing your cookies or using our preference center.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookie List</h2>
            <p>
              Here is a detailed list of the main cookies we use:
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-2 text-left">Cookie Name</th>
                    <th className="border border-gray-300 p-2 text-left">Type</th>
                    <th className="border border-gray-300 p-2 text-left">Duration</th>
                    <th className="border border-gray-300 p-2 text-left">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">_ga</td>
                    <td className="border border-gray-300 p-2">Performance</td>
                    <td className="border border-gray-300 p-2">2 years</td>
                    <td className="border border-gray-300 p-2">Google Analytics user ID</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">_gid</td>
                    <td className="border border-gray-300 p-2">Performance</td>
                    <td className="border border-gray-300 p-2">24 hours</td>
                    <td className="border border-gray-300 p-2">Google Analytics session ID</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">session_id</td>
                    <td className="border border-gray-300 p-2">Essential</td>
                    <td className="border border-gray-300 p-2">Session</td>
                    <td className="border border-gray-300 p-2">User session management</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">user_prefs</td>
                    <td className="border border-gray-300 p-2">Functional</td>
                    <td className="border border-gray-300 p-2">1 year</td>
                    <td className="border border-gray-300 p-2">User preferences and settings</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">_fbp</td>
                    <td className="border border-gray-300 p-2">Marketing</td>
                    <td className="border border-gray-300 p-2">3 months</td>
                    <td className="border border-gray-300 p-2">Facebook pixel tracking</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy periodically to reflect changes in our cookie practices, technology, or legal requirements. The updated policy will be posted on this page with an updated "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <p>
              If you have questions about our cookie practices or this Cookie Policy, please contact us at:
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded">
              <p><strong>UpskillinTech</strong></p>
              <p>Email: privacy@upskillintech.com</p>
              <p>Website: upskillintech.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
